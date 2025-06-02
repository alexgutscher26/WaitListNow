import { __awaiter, __generator } from "tslib";
import { DashboardPage } from '@/components/dashboard-page';
import { db } from '@/lib/db';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { AccountSettings } from './settings-page-content';
/**
 * Renders the Account Settings page after verifying user authentication.
 *
 * This function checks if the user is authenticated by calling `currentUser()`.
 * If unauthenticated, it redirects to the sign-in page. Otherwise, it fetches
 * the user's details from the database using their external ID. If the user's
 * details are not found, it redirects again to the sign-in page. Finally, it
 * renders the Account Settings page within a DashboardPage component.
 */
var Page = function () { return __awaiter(void 0, void 0, void 0, function () {
    var auth, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, currentUser()];
            case 1:
                auth = _a.sent();
                if (!auth) {
                    redirect('/sign-in');
                }
                return [4 /*yield*/, db.user.findUnique({
                        where: { externalId: auth.id },
                    })];
            case 2:
                user = _a.sent();
                if (!user) {
                    redirect('/sign-in');
                }
                return [2 /*return*/, (<DashboardPage title="Account Settings">
      <AccountSettings />
    </DashboardPage>)];
        }
    });
}); };
export default Page;
//# sourceMappingURL=page.jsx.map