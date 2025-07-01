import { Global, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/core/models/user.model';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccesToken } from 'src/common/config/jwt';
import { RedicModule } from 'src/common/redic/redic.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserSubscription } from 'src/core/models/user_subscriptions.model';

@Global()
@Global()
@Module({
  imports: [
    SequelizeModule.forFeature([User,UserSubscription]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>('Jwt_Acc'),
        signOptions: { expiresIn: '40m' },
      }),
    }),
    RedicModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [JwtModule, AuthService] 
})
export class AuthModule {}
