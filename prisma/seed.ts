import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import * as bcrypt from 'bcryptjs';
import { PrismaPg } from '@prisma/adapter-pg';
import { ActivityLevel, Climate, Gender, PrismaClient } from '@prisma/client';
import { isToday, min, setHours, startOfDay, subDays } from 'date-fns';
import { AUTH } from '../src/common/constants/auth.constant';
import { calculateWaterGoal } from '../src/common/utils/calculate-water-goal.util';
import { toDbDay } from '../src/common/utils/db-day.util';

const SEED = {
  PASSWORD: 'qwerty123',
  INTAKE_DAYS: 365,
  SKIP_DAY_CHANCE: 0.1,
  GOAL_REACHED_CHANCE: 0.7,
  GOAL_SHARE: {
    REACHED: { MIN: 1, MAX: 1.2 },
    MISSED: { MIN: 0.5, MAX: 0.95 },
  },
  BUSY_DAY_CHANCE: 0.1,
  INTAKE_HOURS: { FROM: 8, TO: 22 },
  PORTIONS_ML: [150, 200, 250, 300, 330, 500],
  BUSY_DAY_PORTIONS_ML: [100, 150],
};

const DEMO_USER = {
  email: 'demo@waterly.dev',
  profile: {
    name: 'Olena',
    surname: 'Demo',
    gender: Gender.female,
    weight: 62,
    dateOfBirth: new Date('1998-05-17'),
    avatarLink:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces',
  },
  stats: {
    climate: Climate.moderate,
    activity: ActivityLevel.moderate,
    heavySweating: false,
    caffeine: true,
    recovery: false,
  },
};

dotenvExpand.expand(dotenv.config({ quiet: true }));

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

const randomInt = (min: number, max: number) =>
  min + Math.floor(Math.random() * (max - min + 1));

const randomItem = <T>(items: T[]) => items[randomInt(0, items.length - 1)];

const randomBetween = (min: number, max: number) =>
  min + Math.random() * (max - min);

const generateDayPortions = (waterGoal: number, isBusyDay: boolean) => {
  const isGoalReached = isBusyDay || Math.random() < SEED.GOAL_REACHED_CHANCE;
  const share = isGoalReached ? SEED.GOAL_SHARE.REACHED : SEED.GOAL_SHARE.MISSED;
  const targetMl = waterGoal * randomBetween(share.MIN, share.MAX);
  const portionsMl = isBusyDay ? SEED.BUSY_DAY_PORTIONS_ML : SEED.PORTIONS_ML;

  const portions: number[] = [];
  let totalMl = 0;
  while (totalMl < targetMl) {
    const ml = randomItem(portionsMl);
    if (!isGoalReached && totalMl + ml >= waterGoal) break;
    portions.push(ml);
    totalMl += ml;
  }
  return portions;
};

const randomTimeOfDay = (day: Date, now: Date) => {
  const to = min([setHours(day, SEED.INTAKE_HOURS.TO), now]);
  const from = min([setHours(day, SEED.INTAKE_HOURS.FROM), to]);
  return new Date(randomBetween(from.getTime(), to.getTime()));
};

const generateIntakes = (userId: number, waterGoal: number) => {
  const now = new Date();
  const today = startOfDay(now);

  return Array.from({ length: SEED.INTAKE_DAYS }, (_, i) => subDays(today, i))
    .filter((day) => isToday(day) || Math.random() > SEED.SKIP_DAY_CHANCE)
    .flatMap((day) => {
      const isBusyDay = isToday(day) || Math.random() < SEED.BUSY_DAY_CHANCE;
      return generateDayPortions(waterGoal, isBusyDay).map((ml) => {
        const date = randomTimeOfDay(day, now);
        return { userId, date, day: toDbDay(date), ml };
      });
    });
};

const main = async () => {
  const { email, profile, stats } = DEMO_USER;
  const passwordHash = await bcrypt.hash(SEED.PASSWORD, AUTH.DEFAULT_BCRYPT_ROUNDS);
  const waterStats = { ...stats, waterGoal: calculateWaterGoal(profile, stats) };

  const user = await prisma.user.upsert({
    where: { email },
    update: {
      isVerified: true,
      credentials: { upsert: { create: { passwordHash }, update: { passwordHash } } },
      profile: { upsert: { create: profile, update: profile } },
      waterStats: { upsert: { create: waterStats, update: waterStats } },
    },
    create: {
      email,
      isVerified: true,
      credentials: { create: { passwordHash } },
      profile: { create: profile },
      waterStats: { create: waterStats },
    },
  });

  await prisma.waterIntake.deleteMany({ where: { userId: user.id } });
  const { count } = await prisma.waterIntake.createMany({
    data: generateIntakes(user.id, waterStats.waterGoal),
  });
  console.log(`${email} / ${SEED.PASSWORD}: ${count} water intakes`);
};

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
