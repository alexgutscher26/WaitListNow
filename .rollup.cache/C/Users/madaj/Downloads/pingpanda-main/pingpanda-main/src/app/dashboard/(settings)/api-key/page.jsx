import { __awaiter, __generator } from "tslib";
import { DashboardPage } from '@/components/dashboard-page';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { ApiKeySettings } from './api-key-settings';
import { db } from '@/lib/db';
/**
 * Retrieves and displays the API key settings page for a user.
 *
 * This function checks if the user is authenticated, retrieves the user's information from the database,
 * and renders the API key settings page. If the user is not authenticated or does not exist in the database,
 * it redirects to the sign-in page.
 */
var Page = function () { return __awaiter(void 0, void 0, void 0, function () {
    var auth, user;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, currentUser()];
            case 1:
                auth = _b.sent();
                if (!auth) {
                    redirect('/sign-in');
                }
                return [4 /*yield*/, db.user.findUnique({
                        where: { externalId: auth.id },
                    })];
            case 2:
                user = _b.sent();
                if (!user) {
                    redirect('/sign-in');
                }
                return [2 /*return*/, (<DashboardPage title="API Key">
      <ApiKeySettings apiKey={(_a = user.apiKey) !== null && _a !== void 0 ? _a : ''}/>
    </DashboardPage>)];
        }
    });
}); };
export default Page;
//# sourceMappingURL=page.jsx.map