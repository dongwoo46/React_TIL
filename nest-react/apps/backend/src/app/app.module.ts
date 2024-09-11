import { Module } from '@nestjs/common';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { ArticlesModule } from './articles/articles.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ArticlesModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      // load: [databaseConfig],
      envFilePath: [
        process.env.NODE_ENV === 'production'
          ? '.production.env'
          : '.development.env',
      ],
      cache: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        PORT: Joi.number().port().default(3000),
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
      expandVariables: true, // 환경변수 확장 허용
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        await databaseConfig(configService),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
