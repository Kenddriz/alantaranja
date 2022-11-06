import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthInput } from './types/auth.input';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { AuthDto } from './types/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(login: AuthInput): Promise<User> {
    const user = await this.userService.findOneByEmail(login.email);

    if (!user) throw new UnauthorizedException('notFound');

    const isPasswordMatching = await compareSync(login.password, user.password);
    if (!isPasswordMatching) throw new UnauthorizedException('wrongPassword');

    return user;
  }
  async login(payload: AuthDto): Promise<string> {
    return this.jwtService.sign({ ...payload });
  }
}
