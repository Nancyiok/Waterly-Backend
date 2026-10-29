/*
  Warnings:

  - You are about to drop the column `height` on the `profiles` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Climate" AS ENUM ('cool', 'moderate', 'warm', 'extreme');

-- CreateEnum
CREATE TYPE "ActivityLevel" AS ENUM ('sedentary', 'moderate', 'heavy', 'athletic');

-- AlterTable
ALTER TABLE "WaterStats" ADD COLUMN     "activity" "ActivityLevel",
ADD COLUMN     "caffeine" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "climate" "Climate",
ADD COLUMN     "heavySweating" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "recovery" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "height";
