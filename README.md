<p align="center">
  <img src="assets/email/logo.png" alt="Waterly" width="260" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/NestJS-E0234E?logo=nestjs&logoColor=white" alt="NestJS" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/Firebase-FFCA28?logo=firebase&logoColor=black" alt="Firebase" />
  <img src="https://img.shields.io/badge/Swagger-85EA2D?logo=swagger&logoColor=black" alt="Swagger" />
  <img src="https://img.shields.io/badge/Passport_JWT-34E27A?logo=passport&logoColor=white" alt="Passport JWT" />
  <img src="https://img.shields.io/badge/Google_OAuth-4285F4?logo=google&logoColor=white" alt="Google OAuth" />
  <img src="https://img.shields.io/badge/Resend-000000?logo=resend&logoColor=white" alt="Resend" />
  <img src="https://img.shields.io/badge/bcrypt-338033" alt="bcrypt" />
  <img src="https://img.shields.io/badge/class--validator-0F766E" alt="class-validator" />
  <img src="https://img.shields.io/badge/class--transformer-115E59" alt="class-transformer" />
  <img src="https://img.shields.io/badge/date--fns-770C56?logo=datefns&logoColor=white" alt="date-fns" />
  <img src="https://img.shields.io/badge/RxJS-B7178C?logo=reactivex&logoColor=white" alt="RxJS" />
</p>

# Waterly backend

Waterly is a water balance tracker. It counts how much water you drink during the day, sets a daily goal for you and reminds you to drink. This repo is the API for it.

Frontend: [Water-balance-tracker-frontend](https://github.com/Nancyiok/Water-balance-tracker-frontend)

## What it can do

- register, login, login with Google, reset password
- add, edit and delete water records
- daily water goal based on weight, climate and activity
- statistics for a week, a month and a year
- push reminders to drink water

## How to run

You need Node.js 22 and Docker.

```bash
npm install
cp .env.example .env
docker compose up -d
npx prisma migrate deploy
npx prisma generate
npm run start:dev
```

API: http://localhost:3000/api

Swagger: http://localhost:3000/api/docs

If you want test data run `npm run db:seed`. It creates a user `demo@waterly.dev` with password `qwerty123` and adds water records for the last year.

## Env variables

All of them are in `.env.example`.

- `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`, `POSTGRES_HOST`, `POSTGRES_PORT` are for the database. For Docker use `localhost` and `5432`
- `DATABASE_URL` is made from the values above, just leave it as it is
- `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET` can be any random strings
- `JWT_ACCESS_EXPIRES_IN`, `JWT_REFRESH_EXPIRES_IN` are how long tokens live, for example `15m` and `7d`
- `APP_URL` is the frontend url, locally it is `http://localhost:5173`
- `RESEND_API_KEY`, `RESEND_FROM_EMAIL` are needed to send emails, you can get the key on [resend.com](https://resend.com)
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` are needed for Google login
- `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY` are needed for reminders. Take them from the Firebase service account json file. Put the private key in quotes
- `PORT` is `3000` if you don't set it
- `NODE_ENV` set it to `production` on the server, in development all requests are logged

If Firebase keys are empty the app still works, just without push reminders.
