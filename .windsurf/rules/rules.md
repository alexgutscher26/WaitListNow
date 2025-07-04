---
trigger: always_on
---

# WaitListNow Development Rules & Guidelines

## Package Management

- Always use pnpm for package management
- Keep dependencies up to date with regular audits
- Use exact versions in package.json to ensure consistency
- Document any non-standard dependencies in README.md
- Always read package.json to see what dependencies i'm already using
- Always follow image_optimization.md for images
- Implement server-side rendering for critical pages


## TypeScript Guidelines

- DONT USE the `any` type - use proper typing or `unknown` when necessary
- Use TypeScript interfaces for all data structures
- Prefer type inference where possible
- Use strict null checks
- Create reusable type definitions in dedicated files

## Code Style & Structure

- Follow the established project structure
- Use functional components with hooks for React
- Keep components small and focused on a single responsibility
- Use named exports instead of default exports
- Maintain consistent naming conventions:
  - PascalCase for components
  - camelCase for variables and functions
  - UPPER_SNAKE_CASE for constants

## State Management

- Use React Context for global state
- Prefer local state for component-specific data
- Use React Query for server state management
- Document complex state flows with comments

## API & Data Handling

- Use Prisma for all database operations
- Implement proper error handling for all API calls
- Validate all user inputs on both client and server
- Use zod for schema validation
- Follow RESTful principles for API endpoints

## Testing

- Write tests for all critical functionality
- Maintain at least 70% test coverage
- Use Jest for unit tests
- Use Playwright for E2E tests
- Test edge cases and error scenarios

## Performance

- Optimize bundle size with code splitting
- Use React.memo for expensive components
- Implement proper loading states
- Optimize database queries
- Use Next.js Image component for images

## Security

- Never store sensitive information in client-side code
- Implement proper authentication and authorization
- Sanitize all user inputs
- Use HTTPS for all API calls
- Follow OWASP security guidelines

## Accessibility

- Ensure all components meet WCAG 2.1 AA standards
- Use semantic HTML elements
- Provide proper alt text for images
- Ensure keyboard navigation works
- Test with screen readers

## Git Workflow

- Use descriptive commit messages
- Create feature branches for new work
- Submit PRs for code review
- Keep PRs focused and reasonably sized
- Squash commits before merging

## Documentation

- Document all public APIs
- Keep README.md up to date
- Add JSDoc comments for complex functions
- Document environment variables in .env.example

## Use Supports Color for consolelogs Usage

import supportsColor from 'supports-color';

if (supportsColor.stdout) {
console.log('Terminal stdout supports color');
}

if (supportsColor.stdout.has256) {
console.log('Terminal stdout supports 256 colors');
}

if (supportsColor.stderr.has16m) {
console.log('Terminal stderr supports 16 million colors (truecolor)');
}

## unused variables in TypeScript code

Unused variables are generally considered a code smell and should be avoided.

Removing unused references - It prevents unused modules from being loaded at runtime, improving performance, and preventing the compiler from loading metadata that will never be used. - It prevents conflicts that may occur when trying to reference another variable.

NOTE: If you have intentionally left a variable unused, we suggest you to prefix the variable name with a _ to prevent them from being flagged by DeepSource.