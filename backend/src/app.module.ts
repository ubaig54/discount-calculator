import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SendValueController } from './calculator.controller';

@Module({
  imports: [],
  controllers: [AppController, SendValueController],
  providers: [AppService],
})
export class AppModule { }
