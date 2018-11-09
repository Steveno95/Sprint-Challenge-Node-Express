# Review Questions

## What is Node.js?
    It is a runtime environment, a platform used to execute JavaScript applications outside the browser.
## What is Express?
    It is a web application framework that sits on top of the Node.js web server.
## Mention two parts of Express that you learned about this week.
    We learned about express middleware and routing.
## What is Middleware?
    Functions that get the request and response objects and can operate on them and either return the response or call the next middleware in the pipeline.
## What is a Resource?
     A resource is the foundational unit in a RESTful API; it's an object and its context, which can have multiple representations, but a unique URI.
## What can the API return to help clients know if a request was successful?
    The API can return a status code and the response data or a message to let them know it was successful.
## How can we partition our application into sub-applications?
    We can use routers to partition our application
## What is express.json() and why do we need it?
    express.json() is a middleware that is built in to express to parse requests containing JSON. 