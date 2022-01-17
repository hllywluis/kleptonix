# Kleptonix

A community-centric site like you've never seen before.

## Overview

This section will be updated when basic posting and account creation functionality is implemented.

## Getting Started

For running the image on Docker, pull the image and make sure to expose port 3000 to access the site. For example,

```sh
docker run -p 3000:3000 kleptonix
```

To build locally, you'll need `node` installed along with `yarn`. With these installed, run

```sh
yarn install
```

and wait for the dependencies to be installed. When finished, do

```sh
yarn run dev
```

to run the server in development mode and see changes to the code update in realtime. If you'd like to create a production build, use

```sh
yarn run build
```

to do so.

**These instructions will change when Prisma starts to be implemented, so please stay tuned.**

## Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/feature_a`)
3. Commit your Changes (`git commit -m 'Added new feature_a'`)
4. Push to the Branch (`git push origin feature/feature_a`)
5. Open a Pull Request
