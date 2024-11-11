import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration, { loadEnvironment } from '../config/configuration';
import { FirebaseModule } from './firebase/firebase.module';
import { VintedModule } from './vinted/vinted.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'config/environment/.env',
      isGlobal: true,
    }),
    AuthModule,
    FirebaseModule,
    VintedModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ConfigService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
