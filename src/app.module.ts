import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { PizzasModule } from './pizzas/pizzas.module';

@Module({
  imports: [PizzasModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
