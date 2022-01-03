import { Body, Controller, Get, Header, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Redirect, Req, Res, UsePipes } from '@nestjs/common';
import { Request, Response } from 'express';
import { JoiValidationPipe } from 'src/common/pipe/joiValidation.pipe';
import { ValidationPipe } from 'src/common/pipe/validation.pipe';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { ForbiddenException } from './forbidden.exception';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  async create(
    @Body(new ValidationPipe()) createCatDto: CreateCatDto,
  ){
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
    // throw new ForbiddenException();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.catsService.findOne(id);
  }
}
