/**
 * POST /submit
 * Cloudflare Pages Function to handle contact form submissions.
 */
export async function onRequestPost(context) {
    try {
        const { request } = context;

        // Parse JSON body
        const data = await request.json();

        // 1. Spam Protection (Honeypot)
        // The 'confirmEmail' field should be hidden in UI and empty for real users.
        if (data.confirmEmail) {
            // Silently fail (return success to confuse bots) or unauthorized
            return new Response(JSON.stringify({ success: true, message: "Message sent!" }), {
                headers: { "Content-Type": "application/json" },
                status: 200,
            });
        }

        // 2. Input Validation
        const { firstName, lastName, email, service, projectDescription } = data;

        if (!firstName || !lastName || !email || !service) {
            return new Response(JSON.stringify({ success: false, error: "Missing required fields" }), {
                headers: { "Content-Type": "application/json" },
                status: 400,
            });
        }

        // Basic email regex validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return new Response(JSON.stringify({ success: false, error: "Invalid email address" }), {
                headers: { "Content-Type": "application/json" },
                status: 400,
            });
        }

        // 3. Process the Data (e.g., Send Email via Resend)
        const RESEND_API_KEY = context.env.RESEND_API_KEY;

        if (!RESEND_API_KEY) {
            console.error("Missing RESEND_API_KEY environment variable");
            // We don't fail the request so the user still sees "Success", 
            // but we log it for the developer.
        } else {
            try {
                const resendResponse = await fetch("https://api.resend.com/emails", {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${RESEND_API_KEY}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        from: "onboarding@resend.dev", // Only works if sent TO the registered account email during testing
                        to: "work.thebrne@gmail.com",
                        subject: `New Inquiry from ${firstName} ${lastName}`,
                        html: `
                            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                                <h2>New Contact Submission</h2>
                                <p><strong>Name:</strong> ${firstName} ${lastName}</p>
                                <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                                <p><strong>Service:</strong> ${service}</p>
                                <p><strong>Newsletter:</strong> ${data.newsletter ? "Yes" : "No"}</p>
                                <hr style="border: 0; border-top: 1px solid #eaeaea; margin: 20px 0;">
                                <p><strong>Message:</strong></p>
                                <blockquote style="background: #f9f9f9; padding: 15px; border-left: 4px solid #000; margin: 0;">
                                    ${projectDescription ? projectDescription.replace(/\n/g, '<br>') : "N/A"}
                                </blockquote>
                            </div>
                        `
                    })
                });

                if (!resendResponse.ok) {
                    const errorText = await resendResponse.text();
                    console.error("Resend API Error:", errorText);
                } else {
                    console.log("Email sent successfully!");
                }
            } catch (emailErr) {
                console.error("Failed to execute email fetch:", emailErr);
            }
        }

        console.log(`New Contact Submission (Log):
            Name: ${firstName} ${lastName}
            Email: ${email}
            Service: ${service}
            Description: ${projectDescription || "N/A"}
        `);

        // 4. Return Success Response

        // Cloudflare Pages automatically handles CORS for same-origin, 
        // but if testing locally or cross-domain, standard headers apply.
        return new Response(JSON.stringify({
            success: true,
            message: "Thank you! We have received your inquiry."
        }), {
            headers: { "Content-Type": "application/json" },
            status: 200,
        });

    } catch (err) {
        console.error("Submission Error:", err);
        return new Response(JSON.stringify({ success: false, error: "Internal Server Error" }), {
            headers: { "Content-Type": "application/json" },
            status: 500,
        });
    }
}
