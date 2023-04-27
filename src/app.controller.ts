import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { AuthGuard } from './auth-guard/auth.guard';
import { Prisma } from '@prisma/client';
import { CreateTransactionDto } from './dto/transaction.dto';
import { CreateUserDto } from './dto/user.dto';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('token')
  async getToken(@Res() res: Response) {
    const uuid = 'uuid';
    const token = await this.appService.requestToken(uuid);
    res.status(HttpStatus.OK).json(token);
  }

  @UseGuards(AuthGuard)
  @Post('user')
  async createUser(
    @Body()
    data: CreateUserDto,
    @Res() res: Response,
  ) {
    try {
      const result = await this.appService.createUser(data);
      res.status(HttpStatus.OK).json({ user: { uuid: result.uuid } });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        const { status, message } = this.appService.errorHandler(error.code);
        res.status(status).json({ error: message });
      }
    }
  }

  @UseGuards(AuthGuard)
  @Post('user/:uuid/transaction')
  async createTransaction(
    @Param('uuid') uuid: string,
    @Body() data: CreateTransactionDto,
    @Res() res: Response,
  ) {
    try {
      const { calculation } = data;
      await this.appService.createTransaction({
        calculation,
        user: { connect: { uuid: uuid } },
      });
      res.status(HttpStatus.OK).json({ message: 'transaction created' });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        const { status, message } = this.appService.errorHandler(error.code);
        res.status(status).json({ error: message });
      }
    }
  }

  @UseGuards(AuthGuard)
  @Delete('user/:uuid/transaction')
  async deleteTransaction(@Param('uuid') uuid: string, @Res() res: Response) {
    try {
      await this.appService.deleteTransaction({ uuid: uuid });
      res.status(HttpStatus.OK).json({ message: 'transaction deleted' });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        const { status, message } = this.appService.errorHandler(error.code);
        res.status(status).json({ error: message });
      }
    }
  }
}
