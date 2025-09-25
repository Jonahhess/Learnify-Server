# Learnify-Server
Backend server for Learnify app

Learnify is a web platform that uses AI to automatically generate educational courses. This server provides the backend for the Learnify application, managing users, courses, and their content. It features a powerful AI service that can create complete courses, including outlines, lessons, and quizzes, from just a title.

### Security Features

*   **Authentication & Authorization:** Secure user access with JSON Web Tokens (JWT) managed through the `auth.js` middleware.
*   **Rate Limiting:** Protects against brute-force and denial-of-service attacks using the `rateLimiter.js` middleware.
*   **Input Validation:** Input validation ensures the data is correct.
*   **Centralized Error Handling:** The `errorHandler.js` middleware prevents sensitive information from being leaked in error messages.
*   **Secret Management:** API keys and other secrets are managed securely through environment variables.
