import { Module } from '@nestjs/common';
import { FilefourController } from './filefour.controller';
import { FilefourService } from './filefour.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileFour } from './filefour.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FileFour])],
  controllers: [FilefourController],
  providers: [FilefourService]
})
export class FilefourModule {}
