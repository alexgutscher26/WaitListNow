import { __assign, __awaiter, __generator } from "tslib";
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { db } from '@/lib/db';
var resend = new Resend(process.env.RESEND_API_KEY);
// Endpoint to send verification email
export function POST(request) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, email, verificationToken, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, request.json()];
                case 1:
                    _a = _b.sent(), email = _a.email, verificationToken = _a.verificationToken;
                    if (!email || !verificationToken) {
                        return [2 /*return*/, NextResponse.json({ error: 'Email and verification token are required' }, { status: 400 })];
                    }
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, resend.emails.send({
                            from: 'WaitListNow <verification@waitlistnow.app>',
                            to: email,
                            subject: 'Please verify your email address - WaitListNow',
                            html: "\n        <!DOCTYPE html>\n        <html lang=\"en\">\n        <head>\n          <meta charset=\"UTF-8\">\n          <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n          <title>Email Verification</title>\n          <script src=\"https://cdn.tailwindcss.com\"></script>\n        </head>\n        <body class=\"bg-gray-50 font-sans\">\n          <div class=\"max-w-2xl mx-auto p-6\">\n            <div class=\"bg-white rounded-lg shadow-lg overflow-hidden\">\n              <!-- Header -->\n              <div class=\"bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6\">\n                <div class=\"text-center\">\n                  <h1 class=\"text-2xl font-bold text-white\">WaitListNow</h1>\n                  <p class=\"text-blue-100 mt-2\">Email Verification Required</p>\n                </div>\n              </div>\n              \n              <!-- Content -->\n              <div class=\"px-8 py-8\">\n                <div class=\"text-center mb-6\">\n                  <div class=\"inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4\">\n                    <svg class=\"w-8 h-8 text-blue-600\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\n                      <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z\"/>\n                    </svg>\n                  </div>\n                  <h2 class=\"text-2xl font-bold text-gray-900 mb-4\">Verify Your Email Address</h2>\n                </div>\n                \n                <div class=\"text-gray-600 space-y-4 mb-8\">\n                  <p>Hi there! \uD83D\uDC4B</p>\n                  <p>Thank you for joining WaitListNow! To complete your registration and secure your account, we need to verify your email address.</p>\n                  <p>Click the button below to verify your email and get started:</p>\n                </div>\n                \n                <!-- CTA Button -->\n                <div class=\"text-center mb-8\">\n                  <a href=\"".concat(process.env.NEXT_PUBLIC_APP_URL, "/api/verify?token=").concat(verificationToken, "&email=").concat(encodeURIComponent(email), "\" \n                     class=\"inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-8 py-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg\">\n                    \u2709\uFE0F Verify Email Address\n                  </a>\n                </div>\n                \n                <!-- Alternative Link -->\n                <div class=\"bg-gray-50 rounded-lg p-6 mb-6\">\n                  <p class=\"text-sm text-gray-600 mb-2\">\n                    <strong>Can't click the button?</strong> Copy and paste this link into your browser:\n                  </p>\n                  <div class=\"bg-white p-3 rounded border text-xs text-gray-800 break-all font-mono\">\n                    ").concat(process.env.NEXT_PUBLIC_APP_URL, "/api/verify?token=").concat(verificationToken, "&email=").concat(encodeURIComponent(email), "\n                  </div>\n                </div>\n                \n                <!-- Security Notice -->\n                <div class=\"bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6\">\n                  <div class=\"flex items-start\">\n                    <svg class=\"w-5 h-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0\" fill=\"currentColor\" viewBox=\"0 0 20 20\">\n                      <path fill-rule=\"evenodd\" d=\"M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z\" clip-rule=\"evenodd\"/>\n                    </svg>\n                    <div>\n                      <p class=\"text-sm text-amber-800\">\n                        <strong>Security Notice:</strong> This verification link will expire in 24 hours for your security. \n                        If you didn't create an account with WaitListNow, you can safely ignore this email.\n                      </p>\n                    </div>\n                  </div>\n                </div>\n                \n                <!-- Help Section -->\n                <div class=\"text-center text-sm text-gray-500\">\n                  <p>Need help? Contact us at support@waitlistnow.app</p>\n                </div>\n              </div>\n              \n              <!-- Footer -->\n              <div class=\"bg-gray-50 px-8 py-6 border-t\">\n                <div class=\"text-center text-sm text-gray-500 space-y-2\">\n                  <p>&copy; ").concat(new Date().getFullYear(), " WaitListNow. All rights reserved.</p>\n                  <p>This email was sent to <span class=\"font-medium\">").concat(email, "</span></p>\n                  <p>If you didn't request this verification, you can safely ignore this email.</p>\n                </div>\n              </div>\n            </div>\n          </div>\n        </body>\n        </html>\n      "),
                            // Plain text fallback for better email client compatibility
                            text: "\nHi there!\n\nThank you for joining WaitListNow! To complete your registration, please verify your email address by visiting this link:\n\n".concat(process.env.NEXT_PUBLIC_APP_URL, "/api/verify?token=").concat(verificationToken, "&email=").concat(encodeURIComponent(email), "\n\nThis verification link will expire in 24 hours for your security.\n\nIf you didn't create an account with WaitListNow, you can safely ignore this email.\n\nNeed help? Contact us at support@waitlistnow.app\n\n\u00A9 ").concat(new Date().getFullYear(), " WaitListNow. All rights reserved.\n      "),
                        })];
                case 3:
                    _b.sent();
                    return [2 /*return*/, NextResponse.json({ success: true })];
                case 4:
                    error_1 = _b.sent();
                    console.error('Error sending verification email:', error_1);
                    return [2 /*return*/, NextResponse.json({ error: 'Failed to send verification email' }, { status: 500 })];
                case 5: return [2 /*return*/];
            }
        });
    });
}
// Endpoint to verify email using token
export function GET(request) {
    return __awaiter(this, void 0, void 0, function () {
        var searchParams, token, email, subscriber, customFields, storedToken, currentFields, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    searchParams = new URL(request.url).searchParams;
                    token = searchParams.get('token');
                    email = searchParams.get('email');
                    if (!token || !email) {
                        return [2 /*return*/, NextResponse.json({ error: 'Token and email are required' }, { status: 400 })];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, db.subscriber.findFirst({
                            where: { email: email },
                            select: {
                                id: true,
                                customFields: true,
                                status: true,
                            },
                        })];
                case 2:
                    subscriber = _a.sent();
                    if (!subscriber) {
                        return [2 /*return*/, NextResponse.json({ error: 'Subscriber not found' }, { status: 404 })];
                    }
                    customFields = subscriber.customFields;
                    storedToken = customFields === null || customFields === void 0 ? void 0 : customFields.verificationToken;
                    if (storedToken !== token) {
                        return [2 /*return*/, NextResponse.json({ error: 'Invalid or expired verification token' }, { status: 400 })];
                    }
                    currentFields = (subscriber.customFields || {});
                    return [4 /*yield*/, db.subscriber.update({
                            where: { id: subscriber.id },
                            data: {
                                status: 'VERIFIED',
                                customFields: __assign(__assign({}, currentFields), { emailVerified: true, emailVerifiedAt: new Date().toISOString() }),
                            },
                        })];
                case 3:
                    _a.sent();
                    return [2 /*return*/, NextResponse.redirect(new URL('/verification-success', request.url))];
                case 4:
                    error_2 = _a.sent();
                    console.error('Error verifying email:', error_2);
                    return [2 /*return*/, NextResponse.json({ error: 'Failed to verify email' }, { status: 500 })];
                case 5: return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=route.js.map