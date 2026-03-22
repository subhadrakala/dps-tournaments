# dps-tournaments
Service to manage round-robin sports tournaments. 

## Design

The service uses a MVC architecture. The tables are defined in models folder. The routes are defined in routes folder. The controllers are defined in controllers folder. The validations are defined in validations folder. The middleware is defined in middleware folder.

Table Tournament contains the id, name and status of the tournament. The status can be planning, started or finished.

Table Player contains the id and name of the player.

Table TournamentPlayer contains the tournament id, player id, total score, total wins, total losses and total draws.

Table Game contains the tournament id, player1 id, player2 id, player1 score and player2 score.

sqlite3 database is used for the database. The storage file is database.sqlite. Sequelize ORM is used for the database.

zod is used for the request and response validations

## Setup

npm install


## Running the server

    node server.js

## Testing

Jest is used for the unit testing.

    npm test

## Swagger

The API documentaions can be found in the swagger UI.

    http://localhost:3000/api-docs

## API Endpoints

### Players

    GET /players - Get all players
    POST /players - Create a new player
    GET /players/:id - Get player by id
    DELETE /players/:id - Delete player by id

### Tournaments

    GET /tournaments - Get all tournaments
    POST /tournaments - Create a new tournament
    GET /tournaments/:id - Get tournament by id along with leaderboard
    PUT /tournaments/:id - Update tournament by id
    DELETE /tournaments/:id - Delete tournament by id
    GET /tournaments/:id/players - Get all players in a tournament
    GET /tournaments/:id/leaderboard - Get leaderboard of a tournament

### Games
    POST /games - Create a new game




  