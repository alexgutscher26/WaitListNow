import { __assign, __awaiter, __generator } from "tslib";
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { db } from '@/lib/db';
import { getAuth } from '@clerk/nextjs/server';
var resend = new Resend(process.env.RESEND_API_KEY);
export function POST(request) {
    return __awaiter(this, void 0, void 0, function () {
        var origin, auth, userId, email, subscriber, verificationToken, currentFields, verifyUrl, verificationUrl, emailData, response, emailError_1, _a, _b, _c, error_1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    origin = request.headers.get('origin') || 'http://localhost:3000';
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 11, , 12]);
                    auth = getAuth(request);
                    userId = auth.userId;
                    if (!userId) {
                        // console.log('Unauthorized: No user ID found');
                        return [2 /*return*/, new NextResponse('Unauthorized', { status: 401 })];
                    }
                    return [4 /*yield*/, request.json()];
                case 2:
                    email = (_d.sent()).email;
                    if (!email) {
                        return [2 /*return*/, new NextResponse('Email is required', { status: 400 })];
                    }
                    return [4 /*yield*/, db.subscriber.findFirst({
                            where: { email: email },
                            include: {
                                waitlist: {
                                    include: {
                                        user: {
                                            select: { externalId: true },
                                        },
                                    },
                                },
                            },
                        })];
                case 3:
                    subscriber = _d.sent();
                    // Verify the user owns the waitlist
                    if (!subscriber || subscriber.waitlist.user.externalId !== userId) {
                        return [2 /*return*/, new NextResponse('Subscriber not found', { status: 404 })];
                    }
                    verificationToken = require('crypto').randomBytes(32).toString('hex');
                    currentFields = (subscriber.customFields || {});
                    return [4 /*yield*/, db.subscriber.update({
                            where: { id: subscriber.id },
                            data: {
                                customFields: __assign(__assign({}, currentFields), { verificationToken: verificationToken }),
                            },
                        })];
                case 4:
                    _d.sent();
                    _d.label = 5;
                case 5:
                    _d.trys.push([5, 7, , 10]);
                    verifyUrl = new URL('/api/verify-email', origin).toString();
                    verificationUrl = "".concat(verifyUrl, "?token=").concat(verificationToken, "&email=").concat(encodeURIComponent(email));
                    emailData = {
                        from: 'WaitListNow <onboarding@resend.dev>',
                        to: email,
                        subject: 'Please verify your email address - WaitListNow',
                        html: "\n          <!DOCTYPE html>\n          <html lang=\"en\">\n          <head>\n            <meta charset=\"UTF-8\">\n            <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n            <title>Email Verification</title>\n            <style>\n              body {\n                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;\n                line-height: 1.6;\n                color: #374151;\n                margin: 0;\n                padding: 0;\n                background-color: #f9fafb;\n              }\n              .container {\n                max-width: 600px;\n                margin: 0 auto;\n                padding: 20px;\n              }\n              .email-wrapper {\n                background-color: #ffffff;\n                border-radius: 12px;\n                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);\n                overflow: hidden;\n              }\n              .header {\n                background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);\n                padding: 40px 30px;\n                text-align: center;\n                color: white;\n              }\n              .header h1 {\n                margin: 0;\n                font-size: 28px;\n                font-weight: 700;\n                letter-spacing: -0.025em;\n              }\n              .header p {\n                margin: 8px 0 0 0;\n                font-size: 16px;\n                opacity: 0.9;\n              }\n              .content {\n                padding: 40px 30px;\n              }\n              .icon-container {\n                text-align: center;\n                margin-bottom: 30px;\n              }\n              .icon-bg {\n                display: inline-flex;\n                align-items: center;\n                justify-content: center;\n                width: 80px;\n                height: 80px;\n                background-color: #ede9fe;\n                border-radius: 50%;\n                margin-bottom: 20px;\n              }\n              .content h2 {\n                color: #111827;\n                font-size: 24px;\n                font-weight: 700;\n                margin: 0 0 20px 0;\n                text-align: center;\n              }\n              .content p {\n                color: #6b7280;\n                font-size: 16px;\n                margin: 0 0 20px 0;\n                line-height: 1.7;\n              }\n              .cta-container {\n                text-align: center;\n                margin: 40px 0;\n              }\n              .cta-button {\n                display: inline-block;\n                background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);\n                color: black;\n                padding: 16px 32px;\n                text-decoration: none;\n                border-radius: 8px;\n                font-weight: 600;\n                font-size: 16px;\n                box-shadow: 0 4px 14px 0 rgba(79, 70, 229, 0.3);\n                transition: all 0.2s ease;\n              }\n              .cta-button:hover {\n                transform: translateY(-1px);\n                box-shadow: 0 6px 20px 0 rgba(79, 70, 229, 0.4);\n              }\n              .alternative-section {\n                background-color: #f9fafb;\n                border: 1px solid #e5e7eb;\n                border-radius: 8px;\n                padding: 20px;\n                margin: 30px 0;\n              }\n              .alternative-section p {\n                margin: 0 0 10px 0;\n                font-size: 14px;\n                color: #6b7280;\n              }\n              .alternative-section .url {\n                background-color: #ffffff;\n                border: 1px solid #d1d5db;\n                border-radius: 6px;\n                padding: 12px;\n                font-family: 'Courier New', monospace;\n                font-size: 12px;\n                word-break: break-all;\n                color: #374151;\n                margin: 0;\n              }\n              .security-notice {\n                background-color: #fef3c7;\n                border: 1px solid #fcd34d;\n                border-radius: 8px;\n                padding: 16px;\n                margin: 30px 0;\n                display: flex;\n                align-items: flex-start;\n              }\n              .security-notice-icon {\n                flex-shrink: 0;\n                margin-right: 12px;\n                margin-top: 2px;\n              }\n              .security-notice p {\n                margin: 0;\n                font-size: 14px;\n                color: #92400e;\n              }\n              .footer {\n                background-color: #f9fafb;\n                border-top: 1px solid #e5e7eb;\n                padding: 30px;\n                text-align: center;\n              }\n              .footer p {\n                margin: 0 0 8px 0;\n                font-size: 14px;\n                color: #6b7280;\n              }\n              .footer .email-address {\n                font-weight: 600;\n                color: #374151;\n              }\n              @media only screen and (max-width: 600px) {\n                .container { padding: 10px; }\n                .content, .header, .footer { padding: 30px 20px; }\n                .header h1 { font-size: 24px; }\n                .content h2 { font-size: 20px; }\n              }\n            </style>\n          </head>\n          <body>\n            <div class=\"container\">\n              <div class=\"email-wrapper\">\n                <!-- Header -->\n                <div class=\"header\">\n                  <h1>WaitListNow</h1>\n                  <p>Email Verification Required</p>\n                </div>\n                \n                <!-- Content -->\n                <div class=\"content\">\n                  <div class=\"icon-container\">\n                    <div class=\"icon-bg\">\n                      <svg width=\"40\" height=\"40\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                        <path d=\"M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z\" stroke=\"#7c3aed\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                      </svg>\n                    </div>\n                    <h2>Verify Your Email Address</h2>\n                  </div>\n                  \n                  <p>Hello! \uD83D\uDC4B</p>\n                  <p>Thank you for joining our waitlist! To complete your registration and ensure you receive important updates, we need to verify your email address.</p>\n                  <p>Click the button below to verify your email and secure your spot:</p>\n                  \n                  <!-- CTA Button -->\n                  <div class=\"cta-container\">\n                    <a href=\"".concat(verificationUrl, "\" class=\"cta-button\">\n                      \u2709\uFE0F Verify Email Address\n                    </a>\n                  </div>\n                  \n                  <!-- Alternative Link -->\n                  <div class=\"alternative-section\">\n                    <p><strong>Can't click the button?</strong> Copy and paste this link into your browser:</p>\n                    <div class=\"url\">").concat(verificationUrl, "</div>\n                  </div>\n                  \n                  <!-- Security Notice -->\n                  <div class=\"security-notice\">\n                    <div class=\"security-notice-icon\">\n                      <svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"currentColor\" style=\"color: #f59e0b;\">\n                        <path fill-rule=\"evenodd\" d=\"M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z\" clip-rule=\"evenodd\"/>\n                      </svg>\n                    </div>\n                    <div>\n                      <p><strong>Security Notice:</strong> This verification link will expire in 24 hours for your security. If you didn't request to join this waitlist, you can safely ignore this email.</p>\n                    </div>\n                  </div>\n                  \n                  <p style=\"text-align: center; color: #9ca3af;\">Need help? Contact us at support@waitlistnow.app</p>\n                </div>\n                \n                <!-- Footer -->\n                <div class=\"footer\">\n                  <p>&copy; ").concat(new Date().getFullYear(), " WaitListNow. All rights reserved.</p>\n                  <p>This email was sent to <span class=\"email-address\">").concat(email, "</span></p>\n                  <p>If you didn't request this verification, you can safely ignore this email.</p>\n                </div>\n              </div>\n            </div>\n          </body>\n          </html>\n        "),
                        // Plain text fallback for better email client compatibility
                        text: "\nHello!\n\nThank you for joining our waitlist! To complete your registration, please verify your email address by visiting this link:\n\n".concat(verificationUrl, "\n\nThis verification link will expire in 24 hours for your security.\n\nIf you didn't request to join this waitlist, you can safely ignore this email.\n\nNeed help? Contact us at support@waitlistnow.app\n\n\u00A9 ").concat(new Date().getFullYear(), " WaitListNow. All rights reserved.\n        "),
                    };
                    return [4 /*yield*/, resend.emails.send(emailData)];
                case 6:
                    response = _d.sent();
                    // console.log('Resend API response:', JSON.stringify(response, null, 2));
                    if (!response) {
                        throw new Error('No response from Resend API');
                    }
                    return [2 /*return*/, NextResponse.json({
                            success: true,
                            message: 'Verification email sent successfully',
                        })];
                case 7:
                    emailError_1 = _d.sent();
                    console.error('Failed to send email:');
                    console.error('Error name:', emailError_1.name);
                    console.error('Error message:', emailError_1.message);
                    console.error('Error stack:', emailError_1.stack);
                    if (!emailError_1.response) return [3 /*break*/, 9];
                    _b = (_a = console).error;
                    _c = ['Error response data:'];
                    return [4 /*yield*/, emailError_1.response.text()];
                case 8:
                    _b.apply(_a, _c.concat([_d.sent()]));
                    _d.label = 9;
                case 9: throw emailError_1; // This will be caught by the outer try-catch
                case 10: return [3 /*break*/, 12];
                case 11:
                    error_1 = _d.sent();
                    console.error('Error resending verification email:', error_1);
                    return [2 /*return*/, NextResponse.json({ error: 'Failed to resend verification email' }, { status: 500 })];
                case 12: return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=route.js.map