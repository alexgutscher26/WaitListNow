import '@testing-library/jest-dom';
import { jest } from '@jest/globals';
// Mock next/head
/**
 * Renders a React Fragment with the provided children using React.createElement.
 */
var MockHead = function (_a) {
    var children = _a.children;
    // Using React.createElement instead of JSX to avoid TSX issues in .ts file
    return global.React.createElement(global.React.Fragment, {}, children);
};
MockHead.displayName = 'Head';
jest.mock('next/head', function () { return ({
    __esModule: true,
    default: MockHead,
}); });
// Mock next/router
var mockPush = jest.fn();
var mockReplace = jest.fn();
var mockReload = jest.fn();
var mockBack = jest.fn();
var mockPrefetch = jest.fn();
var mockBeforePopState = jest.fn();
var mockOn = jest.fn();
var mockOff = jest.fn();
var mockEmit = jest.fn();
var mockRouter = {
    route: '/',
    pathname: '',
    query: {},
    asPath: '',
    push: mockPush,
    replace: mockReplace,
    reload: mockReload,
    back: mockBack,
    prefetch: mockPrefetch,
    beforePopState: mockBeforePopState,
    events: {
        on: mockOn,
        off: mockOff,
        emit: mockEmit,
    },
};
var useRouter = jest.fn().mockReturnValue(mockRouter);
jest.mock('next/router', function () { return ({
    useRouter: useRouter,
    Router: {
        events: {
            on: mockOn,
            off: mockOff,
            emit: mockEmit,
        },
    },
}); });
// Mock window.scrollTo
Object.defineProperty(window, 'scrollTo', {
    value: jest.fn(),
    writable: true,
});
// Clean up mocks after each test
afterEach(function () {
    jest.clearAllMocks();
});
// Export mocks for use in tests
export { mockRouter, mockPush, mockReplace, mockReload, mockBack, mockPrefetch, mockBeforePopState, mockOn, mockOff, mockEmit, useRouter, };
//# sourceMappingURL=jest.setup.js.map