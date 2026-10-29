-- AlterTable
ALTER TABLE "water_intake" ADD COLUMN "day" DATE;

-- fill the day of existing logs from their date (UTC)
UPDATE "water_intake" SET "day" = "date"::date;

ALTER TABLE "water_intake" ALTER COLUMN "day" SET NOT NULL;

-- CreateIndex
CREATE INDEX "water_intake_user_id_day_idx" ON "water_intake"("user_id", "day");
