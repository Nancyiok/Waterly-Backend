-- AlterTable
ALTER TABLE "WaterStats" DROP COLUMN "dailyRemainingWater",
DROP COLUMN "todayIntakeMl";

-- CreateIndex
CREATE INDEX "water_intake_user_id_date_idx" ON "water_intake"("user_id", "date");
