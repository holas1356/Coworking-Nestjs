<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Coworking Workspace Reservation System

This project is an API built with NestJS to manage the reservation of workspaces in a coworking space. Users can reserve workspaces for a specific session, facilitating the management of space occupancy and improving user experience.

## Requirements

- Node.js (version 14 or higher)
- npm (version 6 or higher) or yarn
- PostgreSQL database (or another database of your choice)

## Project Setup

### Clone the Repository

```bash
git clone https://github.com/holas1356/Coworking-Nestjs.git
cd coworking-nestjs
```

Install Dependencies

Using npm:

```bash
npm install
```
Database Configuration

Create a .env file in the root of the project and configure the environment variables for your database connection. For example:

```bash
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=your_username
DATABASE_PASSWORD=your_password
DATABASE_NAME=your_database
```

Start the Project

Using npm:
```bash
npm run start
```

The project will be available at http://localhost:3000.

Project Structure

```bash
src/
src/
├── app.module.ts         # Main application module
├── main.ts               # Main entry point
├── users/                # Users module
│   ├── users.controller.ts      # Users controller
│   ├── users.service.ts         # Users service
│   ├── entities/
│   │   └── user.entity.ts       # Users entity
│   └── dto/
│       ├── create-user.dto.ts   # DTO to create User
│       └── update-user.dto.ts   # DTO to update User
├── rooms/                # Rooms module
│   ├── rooms.controller.ts      # Rooms controller
│   ├── rooms.service.ts         # Rooms service
│   ├── entities/
│   │   └── room.entity.ts       # Rooms entity
│   └── dto/
│       ├── create-room.dto.ts   # DTO to create Room
│       └── update-room.dto.ts   # DTO to update Room
├── workspaces/           # Workspaces module
│   ├── workspaces.controller.ts    # Workspaces controller
│   ├── workspaces.service.ts       # Workspaces service
│   ├── entities/
│   │   └── workspace.entity.ts     # Workspaces entity
│   └── dto/
│       ├── create-workspace.dto.ts # DTO to create Workspace
│       └── update-workspace.dto.ts # DTO to update Workspace
├── sessions/             # Sessions module
│   ├── sessions.controller.ts      # Sessions controller
│   ├── sessions.service.ts         # Sessions service
│   ├── entities/
│   │   └── session.entity.ts       # Sessions entity
│   └── dto/
│       ├── create-session.dto.ts   # DTO to create Session
│       └── update-session.dto.ts   # DTO to update Session
├── reservations/         # Reservations module
│   ├── reservations.controller.ts      # Reservations controller
│   ├── reservations.service.ts         # Reservations service
│   ├── entities/
│   │   └── reservation.entity.ts       # Reservations entity
│   └── dto/
│       ├── create-reservation.dto.ts   # DTO to create Reservation
│       └── update-reservation.dto.ts   # DTO to update Reservation
└── ...
```

Available Endpoints

Here is an overview of the available endpoints provided by the API:
Users
```bash
POST /users: Create a new user
GET /users: Get all users
GET /users/:id: Get a user by ID
PUT /users/:id: Update a user by ID
DELETE /users/:id: Delete a user by ID
```

Rooms
```bash
POST /rooms: Create a new room
GET /rooms: Get all rooms
GET /rooms/:id: Get a room by ID
PUT /rooms/:id: Update a room by ID
DELETE /rooms/:id: Delete a room by ID
```

Workspaces
```bash
POST /workspaces: Create a new workspace
GET /workspaces: Gel all workspaces
GET /workspaces/available/sessionId: View the list of available workspaces for a room in a session x
GET /workspaces/occupied/:sessionId: View the list of occupied workspaces for a room in a session x
GET /workspaces/users/:userId: View the list of workspaces assigned to a user.
GET /workspaces/session/:sessionId: View the list of workspaces assigned to a session
GET /workspaces/:id: Get a workspace by ID
PUT /workspaces/:id: Update a workspace by ID
DELETE /workspaces/:id: Delete a workspace by ID
```

Sessions
```bash
POST /sessions: Create a new session
GET /sessions: View all sessions
GET /sessions/most-occupied: View the sessions in order of the busiest
GET /sessions/most-available: View the sessions in order by the most available
GET /sessions/:id: Get a session by ID
PUT /sessions/:id: Update a session by ID
DELETE /sessions/:id: Delete a session by ID
```


Reservations
```bash
POST /reservations: Create a new reservation
GET /reservations: Get all reservation
GET /reservations/:id: Get a reservation by ID
PUT /reservations/:id: Update a reservation by ID
DELETE /reservations/:id: Delete a reservation by ID
```
