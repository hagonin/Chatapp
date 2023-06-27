# Real-Time Chat App

This project is a fullstack chat application that will enable users to communicate with each other in real-time. It will feature a modern, user-friendly interface and will be built using Django, React + Typescript. The application will allow users to create accounts using email, phone number or social accounts, send messages, join chatrooms, and more.

## Screenshots

## Features

- User authentication, chat rooms, messages, and notifications
- Real-time communication features ( video chat, voice chat )
- Media management for user-generated content ( profile pictures, video messages )
- Django RESTful API endpoints for user authentication, chat rooms, messages, and notifications
- Swagger and create API documentation
- Integrate Django with PostgreSQL to store and retrieve data
- UI using React + Typescript + SASS, fully responsive

## Installation

```bash
  git clone https://github.com/hagonin/chatapp.git
```

Go to the project directory

```bash
  cd chatapp
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

## Tech Stack

**Client:** React, Typescript, Context API, Sass

**Server:** Django, PostgreSQL

## Run with docker

- start app

```
  docker-compose up -d
```

- restart app

```
docker-compose restart
```

- stop app

```
docker-compose stop
```

- remove all data and container

```
docker-compose down
```

- re-build app

```
docker-compose up --build -d
```

- run migration

```
 docker-compose run be python manage.py migrate
```

- create new database

```
docker exec -it  db createdb -U home db_name
```
