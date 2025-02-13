import { Controller, Get, HttpStatus, NotFoundException, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { swagger_response_schemas } from '../utils/swaggerResponseSchema';
import { UserService } from '../services';
import { FastifyReply, FastifyRequest } from 'fastify';
import { sendResponse } from 'src/utils/response.utils';
import { Roles } from '../constants/auth.constant';
import { RolesGuard } from '../guards/role.guard';

@ApiTags('User')
@Controller()
export class UserController {
  constructor(
    private userService: UserService,
  ) {}

  @ApiBearerAuth()
  @Get('/profile')
  @ApiResponse(swagger_response_schemas.get_user())
  @ApiResponse(swagger_response_schemas.unauthorized('/profile'))
  @ApiResponse(swagger_response_schemas.bad_request('/profile'))
  @ApiResponse(swagger_response_schemas.forbidden('/profile'))
  @ApiResponse(swagger_response_schemas.internal_server('/profile'))
  async get_user(@Req() req: FastifyRequest, @Res() reply: FastifyReply) {
    try {
      const { id, role } = req['user'] as { id: number; role: string; };

      const select = {
        id: true,
        email: true,
        role: true,
      }

      const readUser: any = await this.userService.read({ id }, select);
      if (!readUser) throw new NotFoundException('User Not Found');

      const response = {
        user: {
          id: readUser.id,
          role: readUser.role,
          email: readUser.email,
        },
      };

      sendResponse(reply,HttpStatus.OK,'User profile',response);
    } catch (error) {
      throw error;
    }
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Get('/admin/users')
  @ApiResponse(swagger_response_schemas.get_all_user())
  @ApiResponse(swagger_response_schemas.unauthorized('/admin/users'))
  @ApiResponse(swagger_response_schemas.bad_request('/admin/users'))
  @ApiResponse(swagger_response_schemas.forbidden('/admin/users'))
  @ApiResponse(swagger_response_schemas.internal_server('/admin/users'))
  async get_all_user(@Req() req: FastifyRequest, @Res() reply: FastifyReply) {
    try {
      const select = {
        id: true,
        email: true,
        role: true,
      }

      const users : any = await this.userService.read_all({},select);
      if (!users || users.length == 0) throw new NotFoundException('Users Not Found');

      sendResponse(reply,HttpStatus.OK,'Users Listing', users);
    } catch (error) {
      throw error;
    }
  }
}
