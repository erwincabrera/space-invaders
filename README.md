# Space Invaders

[![CI/CD Pipeline](https://github.com/erwincabrera/space-invaders/actions/workflows/pipeline.yml/badge.svg)](https://github.com/erwincabrera/space-invaders/actions/workflows/pipeline.yml)

[Live Demo](https://spaceinvaders.xyz)

A full stack app based on the classic _Space Invaders_ game. Features audio, user login and logout, and a high scores database.  

This repository contains the frontend code. The repository for the backend can be found [here](https://github.com/erwincabrera/space-invaders-backend).

## Gameplay

- Click the `Start` button to start playing. 
- The `WASD` keys can be used for moving your spaceship. Press the `spacebar` to fire photon torpedoes.
- Earn scores by destroying the invaders.
- The game ends when your spaceship collides with an invader.
- Login to your account if you want your score to appear in the High Scores list.

## Getting Started

Run `yarn` to install the project dependencies.

## Development

1. Run `yarn server` to start a local server at http://localhost:3001 that simulates a backend to handle API requests. Its response is taken from the contents of `./json-server/db.json`.

2. Run `yarn start` to open the application at http://localhost:3000 by default. The page will automatically refresh when changes are made to the source code.

## Testing

Run `yarn test` to launch the unit test runner in watch mode. It will automatically re-run the tests when changes made, similar to `yarn start`.

Run `yarn test --coverage --watchAll=false` to generate the code coverage report.

## Deployment

TODO
