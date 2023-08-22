This is the Calc app

## Getting Started

First, install the project dependencies using [pnpm](https://pnpm.io/installation):

```bash
pnpm i
```

Then run the project using the development server with the following command:

```bash
pnpm dev
```

Using docker

```bash
docker build . -t next-app # build the docker image
docker run -p 3000:3000 next-app # then, run
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the the calc app.

### Connecting to the database

To connect to the database you need to provide a mongo connection string with username and password to the **.env** file.
