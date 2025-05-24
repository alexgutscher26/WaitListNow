import * as Sentry from '@sentry/nextjs';

type LogLevel = 'info' | 'warning' | 'error';
type ConsoleLogLevel = 'log' | 'warn' | 'error';

const logLevelMap: Record<LogLevel, ConsoleLogLevel> = {
  info: 'log',
  warning: 'warn',
  error: 'error',
};

const toSentryLevel = (level: LogLevel): Sentry.SeverityLevel => {
  switch (level) {
    case 'info':
      return 'info';
    case 'warning':
      return 'warning';
    case 'error':
      return 'error';
    default:
      return 'info';
  }
};

export const captureException = (error: Error, context?: Record<string, unknown>): void => {
  if (process.env.NODE_ENV === 'production') {
    Sentry.captureException(error, {
      contexts: {
        ...(context && { context }),
      },
    });
  } else {
    console.error('Error:', error, context);
  }
};

export const captureMessage = (message: string, level: LogLevel = 'info'): void => {
  if (process.env.NODE_ENV === 'production') {
    Sentry.captureMessage(message, toSentryLevel(level));
  } else {
    const consoleMethod = logLevelMap[level];
    const logFunction = console[consoleMethod] as (...args: unknown[]) => void;
    logFunction(`[${level.toUpperCase()}]`, message);
  }
};
