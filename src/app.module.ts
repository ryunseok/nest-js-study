import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { CatsModule } from './cats/cats.modules';
import { CatsService } from './cats/cats.service';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { ValidationPipe } from './common/pipe/validation.pipe';

@Module({
  imports: [CatsModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe
    },
    AppService
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(LoggerMiddleware)
        .forRoutes(CatsController);
  }
}
