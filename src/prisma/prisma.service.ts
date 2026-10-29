import {
  Injectable,
  Logger,
  type OnModuleInit,
  type OnModuleDestroy,
} from '@nestjs/common';
import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { type Prisma, PrismaClient } from '@prisma/client';
import { PRISMA_LOG } from '../common/constants/prisma.constant';

type LogLevel = 'query' | 'warn' | 'error';

@Injectable()
export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, LogLevel>
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL,
    });
    super({
      adapter,
      log: [
        { emit: 'event', level: 'query' },
        { emit: 'event', level: 'warn' },
        { emit: 'event', level: 'error' },
      ],
    });
  }

  async onModuleInit() {
    this.$on('error', ({ message }) => this.logger.error(message));
    this.$on('warn', ({ message }) => this.logger.warn(message));

    this.$on('query', ({ query, duration }) => {
      if (duration >= PRISMA_LOG.SLOW_QUERY_MS) {
        this.logger.warn(`${PRISMA_LOG.SLOW_QUERY} (${duration} ms): ${query}`);
      }
    });

    await this.$connect();
    this.logger.log(PRISMA_LOG.CONNECTED);
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log(PRISMA_LOG.DISCONNECTED);
  }
}
