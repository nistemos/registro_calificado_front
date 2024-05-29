import { Module } from '@nestjs/common';
import { FiletwoController } from './filetwo.controller';
import { FiletwoService } from './filetwo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileTwo } from './filetwo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FileTwo])],
  controllers: [FiletwoController],
  providers: [FiletwoService]
})
export class FiletwoModule {}
