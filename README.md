# node-challenge

Run the proyecto with npm start or npx nodemon index.js

Endpoints for authentication using JWT.
Also an endpoint for refreshing the JWT access token.
/login
/refresh
/validateToken

Endpoint for retrieving movies.
It should be allowed to filter and sort by some field.
GET to /movies or /movies?parameters for filter and sort
Example: /movies?filter[genre]=Action&sort[name]=1 or /movies?filter[director]=6356d8a8c4c7c3b5cd317dd3&sort[name]=1


Endpoint for retrieving the information (director included) of a specific episode of a TV Show
GET to /tvshows

Endpoint for adding a new object (it could be for any entity you like).
POST to /movies
