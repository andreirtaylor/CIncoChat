## System dependencies

#### Node

- install [Node](nodejs.org), preferably using a version manager such as [nvm](https://github.com/creationix/nvm)

#### Docker and docker-compose

- [docker-compose](https://github.com/docker/compose/releases): instructions are here
- [docker](https://store.docker.com/search?type=edition&offering=community): Download for your OS here


## Database setup

- Use the following command to seed your database

```
node server/models --seed
```
- You can also use the above command to completely reset the database at any time

## Running the project

Run each of these in separate terminals

- From **root** folder run `npm run dev`
- From **root** folder run `docker-compose up`
- From **client** folder run `npm start`

