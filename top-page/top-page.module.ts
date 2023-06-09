import { Module } from '@nestjs/common';
import { TopPageController } from './top-page.controller';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Импортируйте ConfigModule и ConfigService

@Module({
  imports: [
    ConfigModule, // Импортируйте ConfigModule
  ],
  controllers: [TopPageController],
  providers: [ConfigService], // Добавьте ConfigService в список провайдеров
})
export class TopPageModule {}