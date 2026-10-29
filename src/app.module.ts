import { THROTTLE } from './common/constants/throttle.constant';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { ROLES_KEY } from './common/decorators/roles.decorator';
import { RoleGuard } from './common/guards/roles.guard';
import { ResponseTransformationInterceptor } from './common/interceptors/transform-response.interceptor';
import { ProfileModule } from './profile/profile.module';
import { WaterIntakeModule } from './water-intake/water-intake.module';
import { PaginationInterceptor } from './common/interceptors/pagination.interceptor';
import { WaterStatsModule } from './water-stats/water-stats.module';
import { StatisticsModule } from './statistics/statistics.module';
import { WaterReminderModule } from './water-reminder/water-reminder.module';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [THROTTLE.DEFAULT],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
    }),
    ScheduleModule.forRoot(),
    PrismaModule,
    UserModule,
    AuthModule,
    JwtModule.register({ global: true }),
    ProfileModule,
    WaterIntakeModule,
    WaterStatsModule,
    StatisticsModule,
    WaterReminderModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: ROLES_KEY,
      useClass: RoleGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: PaginationInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseTransformationInterceptor,
    },
  ],
})
export class AppModule {}
