import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  issueToken(user: { id: number; role: string; }) {
    const payload = { id: user.id, role: user.role };
    return { token: this.jwtService.sign(payload) };
  }
}
