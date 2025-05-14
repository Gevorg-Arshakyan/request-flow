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

# Request Flow Management System

A NestJS-based system for managing anonymous requests with different statuses and actions.

## Features

- Create new requests
- Take requests in progress
- Complete requests with solutions
- Cancel requests with reasons
- Filter requests by date
- Cancel all in-progress requests
- Anonymous request handling
- PostgreSQL database integration
- TypeScript implementation

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Configure the database:
   - Create a PostgreSQL database named `request_flow`
   - Update database credentials in `src/app.module.ts` if needed

4. Start the application:
```bash
npm run start:dev
```

## API Endpoints

### Create Request
- **POST** `/requests`
- **Body**:
  ```json
  {
    "topic": "string",
    "content": "string"
  }
  ```

### Take Request in Progress
- **PUT** `/requests/:id/take-in-progress`
- **Params**: `id` (number)

### Complete Request
- **PUT** `/requests/:id/complete`
- **Params**: `id` (number)
- **Body**:
  ```json
  {
    "solution": "string"
  }
  ```

### Cancel Request
- **PUT** `/requests/:id/cancel`
- **Params**: `id` (number)
- **Body**:
  ```json
  {
    "cancellationReason": "string"
  }
  ```

### Get All Requests
- **GET** `/requests`
- **Query Parameters**:
  - `startDate` (optional): ISO date string
  - `endDate` (optional): ISO date string

### Cancel All In-Progress Requests
- **POST** `/requests/cancel-all-in-progress`


## Development

### Building
```bash
npm run build
```

## License

MIT

