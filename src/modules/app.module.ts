import { Module } from '@nestjs/common';
import {
  AuthModule,
  PrismaModule,
  UserModule
} from './index';
import {
  UserService,
  AuthService,
} from '../services';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthGuard } from '../guards/auth.guard';
import { LoggingInterceptor } from '../interceptor/logger.interceptor';


@Module({
  imports: [
    AuthModule,
    PrismaModule,
    UserModule
  ],
  controllers: [],
  providers: [
    UserService,
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
