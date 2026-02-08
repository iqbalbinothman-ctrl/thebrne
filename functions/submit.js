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
        // To enable email sending:
        // 1. Get API Key from https://resend.com
        // 2. Add RESEND_API_KEY to Cloudflare Pages environment variables
        // 3. Uncomment the code below:

        /*
        const RESEND_API_KEY = context.env.RESEND_API_KEY;
        if (!RESEND_API_KEY) {
            console.error("Missing RESEND_API_KEY");
            // Don't fail the request, just log error and maybe return success to user
        } else {
            const resendResponse = await fetch("https://api.resend.com/emails", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${RESEND_API_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    from: "onboarding@resend.dev", // Configure your verified domain in Resend
                    to: "hello@thebrne.com", // Your email address
                    subject: `New Inquiry from ${firstName} ${lastName}`,
                    html: `
                        <h2>New Contact Submission</h2>
                        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Service:</strong> ${service}</p>
                        <p><strong>Newsletter:</strong> ${data.newsletter ? "Yes" : "No"}</p>
                        <p><strong>Description:</strong></p>
                        <blockquote style="background: #f9f9f9; padding: 10px; border-left: 4px solid #ccc;">
                            ${projectDescription || "N/A"}
                        </blockquote>
                    `
                })
            });

            if (!resendResponse.ok) {
                const errorText = await resendResponse.text();
                console.error("Resend API Error:", errorText);
            }
        }
        */

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
