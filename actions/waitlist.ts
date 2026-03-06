"use server";

export async function submitWaitlist(email: string) {
    if (!email || !email.includes("@")) {
        return { error: "Please enter a valid email address." };
    }

    try {
        const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            :root {
                color-scheme: light dark;
            }
            body { 
                margin: 0; 
                padding: 0; 
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; 
                background-color: #fafafa; 
                color: #111111; 
                -webkit-font-smoothing: antialiased; 
            }
            .container { 
                max-width: 560px; 
                margin: 40px auto; 
                padding: 40px; 
                background: #ffffff;
                border: 1px solid rgba(0,0,0,0.06);
                border-radius: 24px;
                box-shadow: 0 8px 30px rgba(0,0,0,0.04);
            }
            .header { 
                padding-bottom: 24px; 
                margin-bottom: 32px; 
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            .logo { 
                font-size: 20px; 
                font-weight: 700; 
                letter-spacing: -0.5px; 
                color: #111; 
                text-decoration: none; 
            }
            .badge-wrapper {
                text-align: right;
            }
            .badge { 
                display: inline-block;
                background: rgba(0,0,0,0.03); 
                border: 1px solid rgba(0,0,0,0.08); 
                padding: 6px 12px; 
                border-radius: 999px; 
                font-size: 11px; 
                font-weight: 500; 
                color: #111;
                white-space: nowrap;
            }
            @keyframes pulse {
                0% { opacity: 1; }
                50% { opacity: 0.3; }
                100% { opacity: 1; }
            }
            .dot {
                display: inline-block;
                width: 6px;
                height: 6px;
                border-radius: 50%;
                background-color: #10b981;
                margin-right: 6px;
                vertical-align: middle;
                animation: pulse 2s ease-in-out infinite;
            }
            .badge-text {
                vertical-align: middle;
            }
            .title { 
                font-size: 32px; 
                font-weight: 800; 
                letter-spacing: -1px; 
                margin: 0 0 16px 0; 
                color: #111; 
                line-height: 1.1;
            }
            .subtitle { 
                font-size: 15px; 
                line-height: 1.6; 
                color: #666; 
                margin: 0 0 32px 0; 
                font-weight: 500;
            }
            .bento-box { 
                background: #fafafa; 
                border: 1px solid rgba(0,0,0,0.05); 
                border-radius: 16px; 
                padding: 24px; 
                margin-bottom: 24px; 
            }
            .mono-tag {
                font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
                font-size: 10px;
                font-weight: 700;
                letter-spacing: 1.5px;
                text-transform: uppercase;
                color: rgba(0,0,0,0.5);
                display: block;
                margin-bottom: 12px;
            }
            .box-text { 
                font-size: 14px; 
                color: #444; 
                margin: 0 0 16px 0; 
                line-height: 1.6; 
                font-weight: 500;
            }
            .box-text:last-child { margin-bottom: 0; }
            .highlight { 
                color: #111; 
                font-weight: 600;
                text-decoration: none; 
                border-bottom: 1px solid rgba(0,0,0,0.2);
            }
            .buttons { 
                margin-top: 32px; 
            }
            .btn-primary { 
                background: #ffffff; 
                color: #ff3b30; 
                border: 1px solid rgba(0,0,0,0.1);
                padding: 12px 24px; 
                border-radius: 999px; 
                font-weight: 600; 
                text-decoration: none; 
                font-size: 14px; 
                display: inline-block; 
                transition: transform 0.2s;
            }
            .step { 
                font-size: 14px; 
                color: #555; 
                margin: 0 0 12px 0; 
                line-height: 1.5;
                display: flex;
            }
            .step-num {
                color: #111;
                font-weight: 700;
                margin-right: 8px;
            }
            .footer { 
                margin-top: 40px; 
                font-size: 12px; 
                color: #888; 
                line-height: 1.6; 
                text-align: center;
                border-top: 1px solid rgba(0,0,0,0.05);
                padding-top: 24px;
            }
            
            @media (prefers-color-scheme: dark) {
                body { background-color: #000000; color: #ffffff; }
                .container { background: #0a0a0a; border-color: rgba(255,255,255,0.08); box-shadow: 0 8px 30px rgba(0,0,0,0.5); }
                .title, .logo { color: #ffffff; }
                .subtitle { color: #a1a1aa; }
                .badge { background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.1); color: #fff; }
                .bento-box { background: rgba(255,255,255,0.03); border-color: rgba(255,255,255,0.05); }
                .box-text { color: #a1a1aa; }
                .highlight { color: #fff; border-bottom-color: rgba(255,255,255,0.3); }
                .mono-tag { color: rgba(255,255,255,0.4); }
                .btn-primary { background: #ff3b30; color: #ffffff; border: none; }
                .step { color: #a1a1aa; }
                .step-num { color: #fff; }
                .footer { color: #666; border-top-color: rgba(255,255,255,0.05); }
            }
        </style>
        </head>
        <body>
            <div class="container">
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 32px;">
                    <tr>
                        <td align="left">
                            <span class="logo">Prashan</span>
                        </td>
                        <td align="right">
                            <span class="badge"><span class="dot"></span><span class="badge-text">Waitlist Joined</span></span>
                        </td>
                    </tr>
                </table>
                
                <h1 class="title">You are in.</h1>
                <p class="subtitle">Your spot on the Prashan waitlist is officially secured. We're carefully onboarding educators in batches to ensure maximum platform stability.</p>
                
                <div class="bento-box">
                    <span class="mono-tag">Status</span>
                    <p class="box-text">Spot saved for <a href="mailto:${email}" class="highlight">${email}</a></p>
                    <p class="box-text">Keep revolutionizing your curriculum. We will send your exclusive activation link the moment your access batch opens.</p>
                    
                    <div class="buttons">
                        <a href="https://prashan.ai" class="btn-primary">Explore Features</a>
                    </div>
                </div>
                
                <div class="bento-box">
                    <span class="mono-tag">Next Steps</span>
                    <div class="step"><span class="step-num">1</span> <div>We review educator registrations.</div></div>
                    <div class="step"><span class="step-num">2</span> <div>You'll get an invite to the platform.</div></div>
                    <div class="step"><span class="step-num">3</span> <div>Upload curriculums & instantly generate papers.</div></div>
                </div>
                
                <div class="footer">
                    You registered early. Applicants are onboarded first.<br>
                    If you didn't request this, you can safely ignore this email.
                </div>
            </div>
        </body>
        </html>
        `;

        if (process.env.RESEND_API_KEY) {
            const res = await fetch("https://api.resend.com/emails", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    from: "Prashan <onboarding@resend.dev>",
                    to: email,
                    subject: "Prashan waitlist confirmed - you're in",
                    html: htmlContent,
                }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                console.error("Resend API error:", errorData);
                return { error: "Failed to send email. Please try again later." };
            }
        } else {
            console.log("No RESEND_API_KEY found. Mocking email delivery in development mode.");
            console.log("--- MOCK EMAIL DELIVERED TO ---", email);
            await new Promise((resolve) => setTimeout(resolve, 800));
        }

        return { success: true };
    } catch (error) {
        console.error("Waitlist error:", error);
        return { error: "An unexpected error occurred." };
    }
}
