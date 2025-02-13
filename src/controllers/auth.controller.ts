import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  NotFoundException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto, LoginDto, RefreshTokenDto } from '../dto';
import { UserService } from '../services';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { sendResponse } from '../utils/response.utils';
import { FastifyReply } from 'fastify';
import { swagger_response_schemas } from '../utils/swaggerResponseSchema';
import { LoginResponse } from '../interfaces'
import { Public } from '../constants/auth.constant';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Public()
  @Post('/register')
  @ApiResponse(swagger_response_schemas.user_register())
  @ApiResponse(swagger_response_schemas.unauthorized('/auth/register'))
  @ApiResponse(swagger_response_schemas.bad_request('/auth/register'))
  @ApiResponse(swagger_response_schemas.forbidden('/auth/register'))
  @ApiResponse(swagger_response_schemas.internal_server('/auth/register'))
  async user_register(
    @Body() data: RegisterDto,
    @Res() reply: FastifyReply,
  ) {
    try {
      const { email, password, role } = data;

      const readUser: any = await this.userService.read({ email });
      if (readUser) {
        throw new BadRequestException('User already registered with this email');
      }

      const saltOrRounds = 10;
      const hash_password = await bcrypt.hash(password, saltOrRounds);
      const newUser = {
        email: email,
        password: hash_password,
        role: role,
      };

      const user = await this.userService.create(newUser);

      const response = {
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
        }
      };

      sendResponse(reply,HttpStatus.CREATED,'Registration successful!',response);
    } catch (error) {
      throw error;
    }
  }

  @Public()
  @Post('/login')
  @ApiResponse(swagger_response_schemas.auth_login())
  @ApiResponse(swagger_response_schemas.unauthorized('/auth/login'))
  @ApiResponse(swagger_response_schemas.bad_request('/auth/login'))
  @ApiResponse(swagger_response_schemas.forbidden('/auth/login'))
  @ApiResponse(swagger_response_schemas.internal_server('/auth/login'))
  async user_login(
    @Body() data: LoginDto, 
    @Res() reply: FastifyReply
  ) {
    try {
      const { email, password } = data;

      const select = {
        id: true,
        email: true,
        role: true,
        password: true
      }

      const readUser: any = await this.userService.read({ email }, select);
      if (!readUser) throw new NotFoundException('User Not Found');

      const is_password_valid = await bcrypt.compare(
        password,
        readUser.password,
      );
      if (!is_password_valid) throw new UnauthorizedException('Invalid credentials');

      const payload: { id: number; role: string; } = {
        id: readUser.id,
        role: readUser?.role,
      };
      const token = this.jwtService.sign(payload, { expiresIn: '15m' });

      // Generate Refresh Token (Long-lived)
      const refresh_token = this.jwtService.sign(payload, { expiresIn: '7d' });
  
      // Store refresh token in DB 
      await this.userService.update({ id: readUser.id }, { refresh_token: refresh_token });

      const response: LoginResponse = {
        user: {
          id: readUser.id,
          role: readUser.role,
          email: readUser.email
        },
        token,
        refresh_token
      }

      sendResponse(reply,HttpStatus.OK,'Login successful',response);
    } catch (error) {
      throw error;
    }
  }

  @Public()
  @Post('/refresh-token')
  @ApiResponse(swagger_response_schemas.auth_refresh_token())
  @ApiResponse(swagger_response_schemas.unauthorized('/auth/refresh-token'))
  @ApiResponse(swagger_response_schemas.bad_request('/auth/refresh-token'))
  @ApiResponse(swagger_response_schemas.forbidden('/auth/refresh-token'))
  @ApiResponse(swagger_response_schemas.internal_server('/auth/refresh-token'))
  async refresh_token(
    @Body() data: RefreshTokenDto,
    @Res() reply: FastifyReply
  ) {
    try {
      const { refresh_token } = data;
      if (!refresh_token) throw new BadRequestException('Refresh token is required');

      // Verify Refresh Token
      let decoded;
      try {
        decoded = this.jwtService.verify(refresh_token);
      } catch (err) {
        throw new UnauthorizedException('Invalid or expired refresh token');
      }

      // Check if user exists and refresh token matches
      const user = await this.userService.read({ id: decoded.id });
      if (!user || user.refresh_token !== refresh_token) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      // Generate a new Access Token
      const newAccessToken = this.jwtService.sign({ id: user.id, role: user.role }, { expiresIn: '15m' });

      sendResponse(reply, HttpStatus.OK, 'Token refreshed successfully', { access_token: newAccessToken });
    } catch (error) {
      throw error;
    }
  }

}
