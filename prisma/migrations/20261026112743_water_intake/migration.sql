-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female', 'other', 'unspecified');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('admin', 'user');

-- CreateTable
CREATE TABLE "profiles" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'John',
    "surname" TEXT NOT NULL DEFAULT 'Doe',
    "gender" "Gender" DEFAULT 'unspecified',
    "height" INTEGER,
    "weight" DOUBLE PRECISION,
    "avatar_link" TEXT,
    "date_of_birth" TIMESTAMP(3),
    "phone" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'user',
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_credentials" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "googleId" TEXT,
    "password_hash" TEXT,
    "verification_token" TEXT,
    "verification_token_expires_at" TIMESTAMP(3),
    "reset_token" TEXT,
    "reset_token_expires_at" TIMESTAMP(3),
    "refresh_token_hash" TEXT,

    CONSTRAINT "user_credentials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "water_intake" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "amount_ml" INTEGER NOT NULL,

    CONSTRAINT "water_intake_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WaterStats" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "waterGoal" INTEGER NOT NULL DEFAULT 2000,
    "streakGoal" INTEGER NOT NULL DEFAULT 0,
    "todayIntakeMl" INTEGER NOT NULL DEFAULT 0,
    "dailyRemainingWater" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WaterStats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profiles_userId_key" ON "profiles"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_credentials_user_id_key" ON "user_credentials"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_credentials_googleId_key" ON "user_credentials"("googleId");

-- CreateIndex
CREATE UNIQUE INDEX "user_credentials_verification_token_key" ON "user_credentials"("verification_token");

-- CreateIndex
CREATE UNIQUE INDEX "user_credentials_reset_token_key" ON "user_credentials"("reset_token");

-- CreateIndex
CREATE UNIQUE INDEX "WaterStats_userId_key" ON "WaterStats"("userId");

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_credentials" ADD CONSTRAINT "user_credentials_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "water_intake" ADD CONSTRAINT "water_intake_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WaterStats" ADD CONSTRAINT "WaterStats_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
