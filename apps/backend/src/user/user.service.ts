import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';

interface PrismaServiceWithClient {
  client: Prisma.TransactionClient;
}

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  private get db(): Prisma.TransactionClient {
    if ('client' in this.prisma) {
      return (this.prisma as unknown as PrismaServiceWithClient).client;
    }
    return this.prisma;
  }

  findByEmail(email: string): Promise<User | null> {
    return this.db.user.findUnique({
      where: { email },
    });
  }

  findByWallet(walletAddress: string): Promise<User | null> {
    return this.db.user.findUnique({
      where: { walletAddress },
    });
  }

  createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.db.user.create({
      data,
    });
  }
}
