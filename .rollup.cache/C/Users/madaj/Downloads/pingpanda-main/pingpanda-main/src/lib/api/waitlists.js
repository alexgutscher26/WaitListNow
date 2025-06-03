import { __awaiter, __generator } from 'tslib';
var API_URL = '/api/waitlists';
/**
 * Fetches all waitlists for the current user
 */
export function getWaitlists() {
  return __awaiter(this, void 0, void 0, function () {
    var response, error;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [4 /*yield*/, fetch(API_URL)];
        case 1:
          response = _a.sent();
          if (Boolean(response.ok)) return [3 /*break*/, 3];
          return [4 /*yield*/, response.json()];
        case 2:
          error = _a.sent();
          throw new Error(error.message || 'Failed to fetch waitlists');
        case 3:
          return [2 /*return*/, response.json()];
      }
    });
  });
}
/**
 * Creates a new waitlist
 */
export function createWaitlist(data) {
  return __awaiter(this, void 0, void 0, function () {
    var response, error;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [
            4 /*yield*/,
            fetch(API_URL, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            }),
          ];
        case 1:
          response = _a.sent();
          if (Boolean(response.ok)) return [3 /*break*/, 3];
          return [4 /*yield*/, response.json()];
        case 2:
          error = _a.sent();
          throw new Error(error.message || 'Failed to create waitlist');
        case 3:
          return [2 /*return*/, response.json()];
      }
    });
  });
}
/**
 * Updates an existing waitlist
 */
export function updateWaitlist(id, data) {
  return __awaiter(this, void 0, void 0, function () {
    var response, error;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [
            4 /*yield*/,
            fetch(''.concat(API_URL, '/').concat(id), {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            }),
          ];
        case 1:
          response = _a.sent();
          if (Boolean(response.ok)) return [3 /*break*/, 3];
          return [4 /*yield*/, response.json()];
        case 2:
          error = _a.sent();
          throw new Error(error.message || 'Failed to update waitlist');
        case 3:
          return [2 /*return*/, response.json()];
      }
    });
  });
}
/**
 * Deletes a waitlist
 */
export function deleteWaitlist(id) {
  return __awaiter(this, void 0, void 0, function () {
    var response, error;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [
            4 /*yield*/,
            fetch(''.concat(API_URL, '/').concat(id), {
              method: 'DELETE',
            }),
          ];
        case 1:
          response = _a.sent();
          if (Boolean(response.ok)) return [3 /*break*/, 3];
          return [4 /*yield*/, response.json()];
        case 2:
          error = _a.sent();
          throw new Error(error.message || 'Failed to delete waitlist');
        case 3:
          return [2 /*return*/, response.json()];
      }
    });
  });
}
//# sourceMappingURL=waitlists.js.map
