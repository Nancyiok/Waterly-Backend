import { Gender, type UserProfile, type WaterStats } from '@prisma/client';
import { WATER_GOAL } from '../constants/water-goal.constant';

type WaterGoalProfile = Pick<UserProfile, 'weight' | 'gender'> | null;
type WaterGoalFactors = Pick<
  WaterStats,
  'climate' | 'activity' | 'heavySweating' | 'caffeine' | 'recovery'
>;

export const calculateBasedOnWeightWaterGoal = (profile: WaterGoalProfile) => {
  if (!profile?.weight) return WATER_GOAL.DEFAULT_ML;

  const mlPerKg = WATER_GOAL.ML_PER_KG[profile.gender ?? Gender.unspecified];

  return Math.round(profile.weight * mlPerKg);
};

export function calculateWaterGoal(
  profile: WaterGoalProfile,
  additionalFactors: WaterGoalFactors,
): number {
  const baseWaterGoal = calculateBasedOnWeightWaterGoal(profile);

  const climateMl = additionalFactors.climate
    ? WATER_GOAL.CLIMATE_ML[additionalFactors.climate]
    : 0;
  const activityMl = additionalFactors.activity
    ? WATER_GOAL.ACTIVITY_ML[additionalFactors.activity]
    : 0;
  const heavySweatingMl = additionalFactors.heavySweating
    ? WATER_GOAL.HEAVY_SWEATING_ML
    : 0;
  const caffeineMl = additionalFactors.caffeine ? WATER_GOAL.CAFFEINE_ML : 0;
  const recoveryMl = additionalFactors.recovery ? WATER_GOAL.RECOVERY_ML : 0;

  return (
    baseWaterGoal +
    climateMl +
    activityMl +
    heavySweatingMl +
    caffeineMl +
    recoveryMl
  );
}
