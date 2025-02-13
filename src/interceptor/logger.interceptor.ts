import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { logger } from '../utils/logger.utils';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, body, query, params, headers } = request;
    const requestId = uuidv4();
    const userAgent = headers['user-agent'];
    const ip = request.ip;

    const now = Date.now();

    logger.info(`Incoming request`, {
      requestId,
      method,
      url,
      body,
      query,
      params,
      userAgent,
      ip,
    });

    return next.handle().pipe(
      tap(
        (response) => {
          const duration = Date.now() - now;
          logger.info(`Request completed`, {
            requestId,
            method,
            url,
            duration: `${duration}ms`,
            statusCode: context.switchToHttp().getResponse().statusCode,
            response,
          });
        },
        (error) => {
          const duration = Date.now() - now;
          logger.error(`Request failed`, {
            requestId,
            method,
            url,
            duration: `${duration}ms`,
            statusCode: error.status,
            error: error.message,
            stack: error.stack,
          });
        }
      )
    );
  }
}