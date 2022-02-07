<h1 align="center">
  <img alt="letmeask" src=".github/logo.svg" width="400px" />
</h1>

<p align="center">
  <img alt="Developer" src="https://img.shields.io/badge/developer-jfilipedias-blue">
  <img alt="GitHub" src="https://img.shields.io/github/license/jfilipedias/letmeask">
</p>
<br>

Rentx is an API for car rent built with [Node](https://nodejs.org/) and [Express](https://expressjs.com/).

## Technologies
- [Node](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Typescript](https://www.typescriptlang.org/)
- [Docker](https://www.docker.com/)
- [Postgres](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)
- [Jest](https://jestjs.io/)
- [JWT](https://jwt.io/)
- [AWS](https://aws.amazon.com/)

## Getting started

### setup the project
```sh
# Install dependencies
$ yarn

# Build containers
$ docker-compose up -d

# Run database migrations
$ yarn typeorm migration:run

# Seed database
$ yarn seed:admin
```

### Setup the test database
```sql
-- On postgres container create the test database
CREATE DATABASE rentx_test
```

### Setup enviroment variables
```env
AWS_ACCESS_KEY_ID=YOURACCESSKEYID
AWS_SECRET_ACCESS_KEY=YOURSECRETACCESSKEY
AWS_BUCKET=your-bucket-name
AWS_BUCKET_REGION=your-bucket-region
DISK_STORAGE=local
NODE_ENV=localhost
BASE_URL=http://localhost:3333
HOST=http://localhost
PORT=3333
RESET_PASSWORD_ENDPOINT=/password/reset?token=
```

### Run the API
```sh
$ yarn dev
```

### Run the test suit
```sh
$ yarn test
```

## API Requirements
### Car Registration
#### Functional Requirements
- It should be able to register a new car.

#### Business Rules
- It should not be able to register a new car with an existing license plate.
- The car must be registered as available by default.
- Only an admin user should be able to register a car.

### Car Listing
### Functional Requirements
- It should be able to list all available cars.
- It should be able to list all available cars by car name.
- It should be able to list all available cars by category.
- It should be able to list all available cars by brand.

### Business Rules
- The user does not need to be logged in.

### Car Specificartion registration
#### Functional Requirements
- It should be able to register a new specification to a car.

#### Business Rules
- It should not be able to register a specification to a non registered car.
- It should not be able to register a specification already existing to the same car.
- Only an admin user can register a specification.

### Car Specificartion Listing
#### Functional Requirements
- It should be able to list all specifications.

#### Business Rules
- The user does not need to be logged in.

### Car Image Registration
#### Functional Requirements
- It should be able to register a car image.

#### Business Rules
- The user car register more than one image to the same car.
- Only an admin user can register a car image.

### Car Rental
#### Functional Requirements
- It should be able to register a rental.

#### Business Rules
- The rental must have a minimum duration of 24 hours.
- It should not be able to register a new rental if already exists a open rental for the same user.
- It should not be able to register a new rental if already exists a open rental for the same car.
- The user must be looged in.
- When make a rental, the car status must be changed to unavailable.

### Car Return
#### Functional Requirements
- It should be able to return a car.

#### Business Rules
- If the car is returned less than 24 hours later, the full daily should be charged.
- When making the return, the car must be released for another rental.
- When making the return, the user must be released for another rental.
- When making the return, the total rent must be calculated.
- If the return time is longer than the expected return time, a fine proportional to the days of delay must be charged.
- If there is a fine, it must be added to the total rent.
- The user must be logged in.

### Password Recovery
#### Functional Requirements
- It should be able to recover the password by entering the email.
- The user must receive an email with the step by step to recover the password.
- The user should be able to enter a new password.

#### Business Rules
- The user need to enter the new password.
- O usuário precisa informar uma nova senha.
- The link sent for recovery must expire in 3 hours.

## License
This project is licensed under the MIT. Consult the [LICENSE](LICENSE) for more information.
