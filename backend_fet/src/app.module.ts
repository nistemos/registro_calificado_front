import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgramModule } from './program/program.module';
import { CourseModule } from './course/course.module';
import { ProgramYearModule } from './program-year/program-year.module';
import { DriveModule } from './drive/drive.module';
import * as dotenv from 'dotenv';

dotenv.config();
@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.HOSTDB,
    port: parseInt(process.env.PORTDB),
    username: process.env.USERDB,
    password: process.env.PASSDB,
    database: process.env.DBNAME,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  }),UserModule, ProgramModule, CourseModule, ProgramYearModule, DriveModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
