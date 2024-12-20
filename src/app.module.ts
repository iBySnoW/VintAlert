import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FirebaseModule } from './firebase/firebase.module';
import { RoomsModule } from './rooms/rooms.module';
import { BookingsModule } from './bookings/bookings.module';
import { MoviesModule } from './movies/movies.module';
import { FilmShowModule } from './film-show/film-show.module';
import { UsersController } from './users/users.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path'


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'config/environment/.env',
      isGlobal: true,
    }),
    AuthModule,
    FirebaseModule,
    RoomsModule,
    BookingsModule,
    MoviesModule,
    FilmShowModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'swagger-static'),
      serveRoot: process.env.NODE_ENV === 'development' ? '/' : '/docs',
    })
  ],
  controllers: [AppController, UsersController],
  providers: [
    AppService,
    ConfigService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    }
  ],
})
export class AppModule {}
