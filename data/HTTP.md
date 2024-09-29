# HTTP
## Protocol
## Session, Cookie & LocalStorage
### Session
Three phases:
1. Client establish TCP connection
2. Client sends request
3. Server process request, sned back anser with status code and data
### Cookies
A cookie is a small piece of data a server sends to a user's web browser. Cookies enable web applications to store limited amounts of data and remember state information.

Cookies are mainly used for three purposes:
1. Session management: User sign-in status, shopping cart contents, game scores, or any other user session-related details that the server needs to remember.
2. Personalization: User preferences such as display language and UI theme.
3. Tracking: Recording and analyzing user behavior.

reference: [Using HTTP cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)

### CORS
CORS: **Cross-origin resource sharing** is a mechanism for integrating applications. CORS defines a way for client web applications that are loaded in one domain to interact with resources in a different domain.


resource:
- [AWS, What is CORS](https://aws.amazon.com/what-is/cross-origin-resource-sharing)
- [MDN, CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
## Express