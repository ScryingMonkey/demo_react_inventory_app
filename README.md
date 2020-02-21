# SoftBank Robotics Takehome Project

## Project Summary

This project includes two parts, an api backend and a single page app frontend. The backend is an express server running on Heroku, and implenting the graphql specification. The frontend uses Typescript and React with a heavy reliance on functional components, tsx, and the Hooks and Context apis.

Api calls are handled through a central function in AppState.tsx, use current async/await syntax for error stack tracing. Api calls update a local state, which view components referenence and monitor through the Context api.

Styling is handled by component level css, and overridden by App.css for theming.

## Frontend

- `Global State`: I used a simple global context with a few state value fields, and a local array for all products, and a dictionary of functions (described below). Global state is implented using the React Context Api in the App component (App.tsx)

- `Global Functions`: The global context makes functions available for manipulating the local context, and additional functions for updating the local state from outside resources (api calls).

- `Async API calls`: Data state is updated by making an api call, which updates the global context, which then triggers renders for components that reference the data that has been changed. This keeps the flow of activity unidirectional and allows for checkpoints in the troubleshooting process.
  </br></br>Component level listeners (uesEffect hook) monitor for changes that requires a data update (search bar value change, etc). Listeners then call functions on the global context that trigger api calls. Api calls are performed by calling a function on the global context object (context.f.functionName). These functions build a query, which is sent to a central api processing function. based on useEffect watching

- `Detail View via routing`: The detail view (used for displaying, creating and editing products) is displayed based on the url in the browser. This means that a user can bookmark and/or share a page with consistant results.
  The ProductDetail component monitors the url path and updates itself with a api call when this changes.

- `Top bar icon (mostly for fun)`:
  The icon in the top right corner of the top bar can take several different states, representing different common icons. In this project the icon is used to add products (from the products view), and from the detail view to go back to the list view.

## Backend

- `Express`: The api interface is served from an express server running on a Heroku cluster. The data base is accessed using the Mongoose library and Mongoose models.

- `MongoDB`: The data base is hosted on a Mongo Atlas cluster. There is a collection for products, and another for users.

- `Graphql`: The api implements the graphql specification. An interface schema processes queries, which are then fulfilled using a combined resolver.

- `Authentication`: Client sends credentials to the api, which validates the user's credentials and returns a JWT with a 1 hour life. Further requests to the api must included the user's JWT in order to be fulfilled.

## Moving Forward

- `Refactor to use filtered data set`: The current architecture assumes that the client will be able to download the entire array of products, which could be become inpractical with very large data sets.

- `Authentication`: The current auth flow sends intial credentials in plain text. Credentials should be encrypted in transit using a hash secret provided by the SPA.

- `Encryption`: API responses may contain sensitive data, and may need to be encrypted in transit.

- `Tests`: Backend is written in JS and presented multiple runtime errors that needed to be debugged. I would convert to Typescript for type safety (compile rather than runtime bugs) and implement CI unit tests for resolvers.
