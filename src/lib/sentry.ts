import * as Sentry from '@sentry/nextjs';

type LogLevel = 'info' | 'warning' | 'error';
type ConsoleLogLevel = 'log' | 'warn' | 'error';

const logLevelMap: Record<LogLevel, ConsoleLogLevel> = {
  info: 'log',
  warning: 'warn',
  error: 'error',
};

/**
 * Maps a log level to its corresponding Sentry severity level.
 *
 * This function uses a switch statement to match the provided log level
 * against known cases ('info', 'warning', 'error'). If the log level matches
 * one of these cases, it returns the same string value. For any other log levels,
 * it defaults to 'info'.
 *
 * @param level - The log level to convert.
 */
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

/**
 * Captures an exception and logs it to Sentry in production; otherwise, logs it to the console.
 */
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

/**
 * Captures a message for logging or error tracking.
 */
export const captureMessage = (message: string, level: LogLevel = 'info'): void => {
  if (process.env.NODE_ENV === 'production') {
    Sentry.captureMessage(message, toSentryLevel(level));
  } else {
    const consoleMethod = logLevelMap[level];
    const logFunction = console[consoleMethod] as (...args: unknown[]) => void;
    logFunction(`[${level.toUpperCase()}]`, message);
  }
};
