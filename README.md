# Cinco Chat

A basic chat so that I could learn redux and have a template for real time apps in the future.

## Dependencies

### Node

- install [Node](nodejs.org), preferably using a version manager such as [nvm](https://github.com/creationix/nvm)

### Docker and docker-compose

- [docker-compose](https://github.com/docker/compose/releases): instructions are here
- [docker](https://store.docker.com/search?type=edition&offering=community): Download for your OS here


## Running the project

I assume you have access to a terminal running bash. And have installed the dependencies
Run this command then when the containers start up exit them

```
docker-compose up
```

Then open a bash terminal and type

```
npm run-script runandbuild
```

Then go to 

```
localhost:8000 
```

in your browser

### Notes
- There are three accounts set up "`tim@cinco.com`, `eric@cinco.com` and `steve@cinco.com`" 
all their passwords are `test` you can also make a new account if you wish
- shift enter can be used to send a message

#Development

# Running with Hot Reloading for Dev

Run each of these in separate terminals

- From **root** folder run `docker-compose up`
    - now seed the db `node server/models --seed`
        - You can also use the above command to completely reset the database at any time
- From **root** folder run `npm run dev`
- From **client** folder run `npm start`

# Design and Architecture
- Built with React.js, Redux, Material UI, Redis, Postgres, docker, docker-compose, node and express

## Architecture
![Overview of architecture](Architecture.png)

## Tim and Eric
- [Cinco Products](https://www.youtube.com/watch?v=TLa1jlhEtu8)
