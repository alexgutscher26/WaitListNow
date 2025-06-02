import { __assign, __awaiter, __extends, __generator, __makeTemplateObject } from "tslib";
import { db } from '@/lib/db';
// Custom error class for waitlist preferences errors
var WaitlistPreferencesError = /** @class */ (function (_super) {
    __extends(WaitlistPreferencesError, _super);
    function WaitlistPreferencesError(message, code) {
        if (code === void 0) { code = 'WAITLIST_PREFERENCES_ERROR'; }
        var _this = _super.call(this, message) || this;
        _this.code = code;
        _this.name = 'WaitlistPreferencesError';
        return _this;
    }
    return WaitlistPreferencesError;
}(Error));
export { WaitlistPreferencesError };
export var defaultWaitlistPreferences = {
    defaultWaitlistLimit: 1,
    autoApproveSubscribers: true,
    emailNotifications: true,
    maxSubscribers: 1000,
    requireEmailVerification: false,
};
export function getUserWaitlistPreferences(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var result, prefsJson, prefs, mergedPrefs, error_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!userId) {
                        throw new WaitlistPreferencesError('User ID is required', 'USER_ID_REQUIRED');
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    console.log("[getUserWaitlistPreferences] Fetching preferences for user: ".concat(userId));
                    return [4 /*yield*/, db.$queryRaw(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      SELECT \"waitlist_preferences\" as waitlist_preferences\n      FROM \"User\" \n      WHERE \"externalId\" = ", "\n      LIMIT 1\n    "], ["\n      SELECT \"waitlist_preferences\" as waitlist_preferences\n      FROM \"User\" \n      WHERE \"externalId\" = ", "\n      LIMIT 1\n    "])), userId)];
                case 2:
                    result = _b.sent();
                    if (!result || result.length === 0) {
                        console.warn("[getUserWaitlistPreferences] User not found: ".concat(userId));
                        throw new WaitlistPreferencesError('User not found', 'USER_NOT_FOUND');
                    }
                    prefsJson = (_a = result[0]) === null || _a === void 0 ? void 0 : _a.waitlist_preferences;
                    // If no preferences exist yet, return defaults
                    if (!prefsJson) {
                        console.log("[getUserWaitlistPreferences] No preferences found for user ".concat(userId, ", returning defaults"));
                        return [2 /*return*/, __assign({}, defaultWaitlistPreferences)];
                    }
                    prefs = void 0;
                    try {
                        prefs = typeof prefsJson === 'string' ? JSON.parse(prefsJson) : prefsJson;
                    }
                    catch (parseError) {
                        console.error("[getUserWaitlistPreferences] Error parsing preferences for user ".concat(userId, ":"), parseError);
                        // If parsing fails, return defaults
                        return [2 /*return*/, __assign({}, defaultWaitlistPreferences)];
                    }
                    mergedPrefs = __assign(__assign({}, defaultWaitlistPreferences), prefs);
                    console.log("[getUserWaitlistPreferences] Successfully retrieved preferences for user ".concat(userId));
                    return [2 /*return*/, mergedPrefs];
                case 3:
                    error_1 = _b.sent();
                    console.error("[getUserWaitlistPreferences] Error for user ".concat(userId, ":"), error_1);
                    // If it's our custom error, rethrow it
                    if (error_1 instanceof WaitlistPreferencesError) {
                        throw error_1;
                    }
                    // For other errors, wrap in our custom error
                    throw new WaitlistPreferencesError(error_1 instanceof Error ? error_1.message : 'Failed to get waitlist preferences', 'FETCH_PREFERENCES_FAILED');
                case 4: return [2 /*return*/];
            }
        });
    });
}
export function updateUserWaitlistPreferences(userId, updates) {
    return __awaiter(this, void 0, void 0, function () {
        var currentPrefs, newPrefs, result, error_2;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!userId) {
                        throw new WaitlistPreferencesError('User ID is required', 'USER_ID_REQUIRED');
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    console.log("[updateUserWaitlistPreferences] Updating preferences for user: ".concat(userId), {
                        updates: updates,
                    });
                    return [4 /*yield*/, getUserWaitlistPreferences(userId)];
                case 2:
                    currentPrefs = _b.sent();
                    newPrefs = __assign(__assign(__assign({}, currentPrefs), updates), { 
                        // Ensure maxSubscribers is within bounds
                        maxSubscribers: Math.min(10000, Math.max(100, (_a = updates.maxSubscribers) !== null && _a !== void 0 ? _a : currentPrefs.maxSubscribers)) });
                    console.log("[updateUserWaitlistPreferences] New preferences for user ".concat(userId, ":"), newPrefs);
                    return [4 /*yield*/, db.$executeRaw(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n      UPDATE \"User\"\n      SET \n        \"waitlist_preferences\" = ", "::jsonb,\n        \"updatedAt\" = NOW()\n      WHERE \"externalId\" = ", "\n      RETURNING id, \"waitlist_preferences\" as waitlist_preferences\n    "], ["\n      UPDATE \"User\"\n      SET \n        \"waitlist_preferences\" = ", "::jsonb,\n        \"updatedAt\" = NOW()\n      WHERE \"externalId\" = ", "\n      RETURNING id, \"waitlist_preferences\" as waitlist_preferences\n    "])), JSON.stringify(newPrefs), userId)];
                case 3:
                    result = _b.sent();
                    if (result === 0) {
                        throw new WaitlistPreferencesError('User not found', 'USER_NOT_FOUND');
                    }
                    console.log("[updateUserWaitlistPreferences] Successfully updated preferences for user ".concat(userId));
                    return [2 /*return*/, newPrefs];
                case 4:
                    error_2 = _b.sent();
                    console.error("[updateUserWaitlistPreferences] Error for user ".concat(userId, ":"), error_2);
                    // If it's our custom error, rethrow it
                    if (error_2 instanceof WaitlistPreferencesError) {
                        throw error_2;
                    }
                    // For other errors, wrap in our custom error
                    throw new WaitlistPreferencesError(error_2 instanceof Error ? error_2.message : 'Failed to update waitlist preferences', 'UPDATE_PREFERENCES_FAILED');
                case 5: return [2 /*return*/];
            }
        });
    });
}
var templateObject_1, templateObject_2;
//# sourceMappingURL=waitlist-preferences.js.map