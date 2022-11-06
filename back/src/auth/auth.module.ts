import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { jwtConstants } from '../configuration/jwt';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [JwtModule.register(jwtConstants)],
  providers: [AuthResolver, AuthService, JwtStrategy],
  exports: [JwtStrategy, AuthService],
})
export class AuthModule {}
