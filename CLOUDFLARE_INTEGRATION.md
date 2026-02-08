# Connecting Cloudflare Functions

Your contact form is **already connected**! 

Cloudflare Pages uses **file-system routing**. Because we created the file `functions/submit.js`, Cloudflare automatically maps any request to `your-site.com/submit` to that file.

1.  **Frontend**: `ContactPage.tsx` sends a `POST` request to `/submit`.
2.  **Backend**: `functions/submit.js` receives that request and handles it.

## How to Check Submissions (Logs)

Since we haven't connected an email provider yet, the form currently just **logs** the submissions to the servers.

1.  Go to the **Cloudflare Dashboard**.
2.  Navigate to **Pages** > **Your Project** (`thebrne`).
3.  Click on the **Logs** tab (or "Deployment" > "Functions" > "Real-time Logs").
4.  Submit the form on your live website.
5.  You should see the "New Contact Submission" log entry appear with the form data.

## Next Step: Sending Emails (Integration)

To actually receive emails, you need to integrate a 3rd-party email service (like **Resend**, **SendGrid**, or **Mailgun**) because Cloudflare Functions cannot send emails directly (they only run code).

### Recommended: Use Resend (Free & Easy)

1.  **Get an API Key**: Sign up at [resend.com](https://resend.com) and get an API Key.
2.  **Add Environment Variable**:
    *   Go to Cloudflare Dashboard > Settings > Environment Variables.
    *   Add a variable named `RESEND_API_KEY` with your key.
3.  **Update `submit.js`**:
    *   We need to uncomment the email sending logic in `functions/submit.js`.

**I can update `submit.js` for you right now if you want to use Resend or another provider. Just let me know which one you prefer!**
