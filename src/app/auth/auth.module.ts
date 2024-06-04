import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategy/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstant } from 'src/utils/constant/jwt.constant';
import { TokenManagerService } from './token-manager.service';
import { UserModule } from '../user/user.module';
import { MessageModule } from '../message/message.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      global: true,
      secret: jwtConstant.accessTokenSecret,
      signOptions: { expiresIn: '1d' },
    }),
    UserModule,
    MessageModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, TokenManagerService],
})
export class AuthModule {}
