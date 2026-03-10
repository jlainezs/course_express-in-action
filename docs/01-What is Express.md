# What is Express
Express is a minimal framework built over Node.js It is minimal and makes life easier
when developing Node.js applications by providing several elements to the NodeJS basic request handler function.

## Components of an Express application
### Middleware
The purpose of middlewares is to break the request handler in several parts, so each one of those parts will take care of one aspect of the request. At the end, you end with several handlers that are called in a chain.

Request -> Log middleware -> Authorization middleware -> Response

### Routing

It also breaks the request handler function in small pieces which are executed conditionally, depending on the requested URL and method.

### Subapplications

Express does not impose a way to scale an app, but it provides us with subapplications (routers in Express terminology). Subapplications allows us to compartmentalize a large app into smaller pieces. P.e.  an application can be composed by an administration panel, several APIs and a SPA for user authentication.

### Conveniences

Essentially, those are helper functions.

