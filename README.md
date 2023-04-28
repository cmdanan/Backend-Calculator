<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Calculator's Backend

The backend server for the calculator app

<p align="center">

<a href="">![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)</a>
<a href="">![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)</a>

</p>

## Run Locally

Clone the project

```bash
  https://github.com/cmdanan/prpnestjs.git
```

Go to the project directory

```bash
  cd prpnestjs
```

Install dependencies using NPM

```bash
  npm install
```

or using Yarn

```bash
  yarn install
```

Create your .env file and add the Postgres Database URL config

```bash
  postgresql://USER:PASSWORD@HOST:PORT/DATABASE
```

Run the following command and it will automatically create the tables for your based on the schema.prisma file provided

```bash
  npx prisma migrate dev --name init
```

Start the server

```bash
  npm run start:dev
```
