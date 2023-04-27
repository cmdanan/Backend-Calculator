import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from './prisma/prisma.service';
import { Prisma, Transaction, User } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(private jwtService: JwtService, private prisma: PrismaService) {}

  async requestToken(uuid: string): Promise<{ access_token: string }> {
    return { access_token: await this.jwtService.signAsync({ uuid }) };
  }

  async createUser(data?: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data });
  }

  createTransaction(
    data?: Prisma.TransactionCreateInput,
  ): Promise<Transaction> {
    return this.prisma.transaction.create({ data });
  }

  deleteTransaction(data: Prisma.TransactionWhereInput) {
    return this.prisma.transaction.deleteMany({ where: { uuid: data.uuid } });
  }

  errorHandler(code: string) {
    let status: HttpStatus;
    let message = '';
    switch (code) {
      case 'P2002':
        status = HttpStatus.BAD_REQUEST;
        message = 'uuid already exists';
        break;
      case 'P2025':
        status = HttpStatus.NOT_FOUND;
        message = 'user not found';
        break;
    }

    return { status, message };
  }
}
