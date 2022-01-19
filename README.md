# Kleptonix

[![CodeQL](https://github.com/hllywluis/kleptonix/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/hllywluis/kleptonix/actions/workflows/codeql-analysis.yml)

A community-centric site like you've never seen before.

## Overview

This section will be updated when basic posting and account creation functionality is implemented.

## Getting Started

For running the image on Docker, clone the repo using the green button above. Then, simply run:

```sh
docker compose up
```

to build the necessary containers.

---

To build locally, you'll need `node` installed along with `yarn`. You will also need `postgres` installed for the database with which to communicate with. With these installed, run

```sh
yarn install
```

and wait for the dependencies to be installed. After this, you need to have a database set up the way Prisma expects it to be. To achieve this, run

```sh
yarn prisma db push
```

and it will push the schema to the database defined in the `DATABASE_URL` environment variable. The necessary Prisma client will also be generated with this command, so there's no need to run `yarn prisma generate` separately.

When finished with those steps, do

```sh
yarn run dev
```

to run the server in development mode and see changes to the code update in realtime. If you'd like to create a production build, use

```sh
yarn run build
```

to do so, but keep in mind that whatever environment the application will be deployed to must have the same `postgres` database setup as defined by `DATABASE_URL` and the schema.

## Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/feature_a`)
3. Commit your Changes (`git commit -m 'Added new feature_a'`)
4. Push to the Branch (`git push origin feature/feature_a`)
5. Open a Pull Request
