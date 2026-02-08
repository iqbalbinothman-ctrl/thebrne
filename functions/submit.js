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

        // 3. Process the Data (e.g., Send Email, Store in DB, Log)
        // For this implementation, we will log to console and return success.
        // TODO: Integrate with SendGrid, Mailgun, or Turnstile here.

        console.log(`New Contact Submission:
      Name: ${firstName} ${lastName}
      Email: ${email}
      Service: ${service}
      Description: ${projectDescription || "N/A"}
    `);

        // 4. Return Success Response
        // return new Response(JSON.stringify({ success: true, message: "We'll be in touch soon." }), {
        //   headers: { 
        //     "Content-Type": "application/json",
        //     "Access-Control-Allow-Origin": "*" // Adjust for production security
        //   },
        //   status: 200,
        // });

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
