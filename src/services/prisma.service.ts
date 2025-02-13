import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';
import { Logger } from '@nestjs/common';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);
  auditLogs: any;

  constructor() {
    super({
      log: [
        { emit: 'event', level: 'query' },
        { emit: 'event', level: 'info' },
        { emit: 'event', level: 'warn' },
        { emit: 'event', level: 'error' },
      ],
    });

    this.$on('query' as never, (e: Prisma.QueryEvent) => {
      this.logger.debug(`Query: ${e.query}`);
      this.logger.debug(`Params: ${e.params}`);
      this.logger.debug(`Duration: ${e.duration}ms`);
    });

    this.$on('info' as never, (e: Prisma.LogEvent) => {
      this.logger.log(`Info: ${e.message}`);
    });

    this.$on('warn' as never, (e: Prisma.LogEvent) => {
      this.logger.warn(`Warning: ${e.message}`);
    });

    this.$on('error' as never, (e: Prisma.LogEvent) => {
      this.logger.error(`Error: ${e.message}`);
    });
  }

  async onModuleInit() {
    await this.$connect();
    await this.$executeRaw`SET TIMEZONE = 'UTC'`;
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
