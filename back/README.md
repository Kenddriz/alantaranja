<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://theinternationalportage.solutions/wp-content/uploads/2022/04/TIPS_Logotipo-Color-02.png" width="200" alt="Nest Logo" /></a>
</p>

## Description

The International Portage Solutions middle office application codebase

## Stack requirements
- NestJs (nodejs has to be installed on computer)
- Postgresql
- Yarn
## Installation

With <b>yarn</b> (recommended)
```bash
$ yarn
```

## Configuration for development environment
Before running the app, create a .env file with a copy of ```.env.example``` to configure database values.

The variables of the database are : ```DATABASE_HOST```, ```DATABASE_NAME```,```DATABASE_USER```, ```DATABASE_PASSWORD```, ```DATABASE_PORT```

Change these values to make it fit on your local configuration

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Lozikagency](https://lozikagency.com)
- Website - [https://lozikagency.com](https://lozikagency.com/)

## License

The project is a private and commercial project. This is not an open source project
