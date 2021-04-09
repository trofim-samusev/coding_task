import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

import { PizzasService } from './pizzas.service';

@Controller('pizzas')
export class PizzasController {
  constructor(private readonly pizzasService: PizzasService) {}

  @Get()
  @ApiQuery({ name: 'start', type: 'number', required: false })
  @ApiQuery({ name: 'limit', type: 'number', required: false })
  @ApiQuery({ name: 'search', type: 'string', required: false })
  findAll(@Query() query: { start?: number; limit?: number }) {
    return this.pizzasService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pizzasService.findOne(+id);
  }
}
