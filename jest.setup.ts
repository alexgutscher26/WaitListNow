import '@testing-library/jest-dom';
import { jest } from '@jest/globals';
import type { ReactNode } from 'react';

// Mock next/head
/**
 * Renders a React Fragment with the provided children.
 */
const MockHead = ({ children }: { children: ReactNode }) => {
  // Using React.createElement instead of JSX to avoid TSX issues in .ts file
  return global.React.createElement(global.React.Fragment, {}, children);
};
MockHead.displayName = 'Head';

jest.mock('next/head', () => ({
  __esModule: true,
  default: MockHead,
}));

// Mock next/router
const mockPush = jest.fn();
const mockReplace = jest.fn();
const mockReload = jest.fn();
const mockBack = jest.fn();
const mockPrefetch = jest.fn();
const mockBeforePopState = jest.fn();
const mockOn = jest.fn();
const mockOff = jest.fn();
const mockEmit = jest.fn();

const mockRouter = {
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

const useRouter = jest.fn().mockReturnValue(mockRouter);

jest.mock('next/router', () => ({
  useRouter,
  Router: {
    events: {
      on: mockOn,
      off: mockOff,
      emit: mockEmit,
    },
  },
}));

// Mock window.scrollTo
Object.defineProperty(window, 'scrollTo', {
  value: jest.fn(),
  writable: true,
});

// Clean up mocks after each test
afterEach(() => {
  jest.clearAllMocks();
});

// Export mocks for use in tests
export {
  mockRouter,
  mockPush,
  mockReplace,
  mockReload,
  mockBack,
  mockPrefetch,
  mockBeforePopState,
  mockOn,
  mockOff,
  mockEmit,
  useRouter,
};
