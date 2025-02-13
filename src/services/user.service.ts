import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { User } from '../interfaces';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async read(
    cond: any,
    select: any = {
      id: true,
      email: true,
      password: true,
      role: true,
      refresh_token: true,
      created_at: true,
      updated_at: true,
    },
  ): Promise<Partial<User>> {
    try {
      return this.prismaService.user.findFirst({ where: cond, select });
    } catch (error) {
      throw error;
    }
  }

  async read_all(
    cond: any,
    select: any = {
      id: true,
      email: true,
      password: true,
      role: true,
      refresh_token: true,
      created_at: true,
      updated_at: true,
    },
  ): Promise<Partial<User>[]> {
    return this.prismaService.user.findMany({
      where: cond,
      select,
    });
  }

  async create(
    data: any,
    select = {
      id: true,
      email: true,
      password: true,
      role: true,
      refresh_token: true,
      created_at: true,
      updated_at: true,
    },
  ): Promise<Partial<User>> {
    return this.prismaService.user.create({
      data,
      select,
    });
  }

  async update(
    cond: any,
    data: any,
    select = {
      id: true,
      email: true,
      password: true,
      role: true,
      refresh_token: true,
      created_at: true,
      updated_at: true,
    },
  ): Promise<Partial<User>> {
    return this.prismaService.user.update({
      where: cond,
      data,
      select,
    });
  }
}
