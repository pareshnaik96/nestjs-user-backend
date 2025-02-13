import { Module } from '@nestjs/common';
import { AuthController } from '../controllers';
import { 
  AuthService, 
  UserService,
} from '../services';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../constants/auth.constant';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '2h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService, 
    UserService,
  ],
})
export class AuthModule {}
