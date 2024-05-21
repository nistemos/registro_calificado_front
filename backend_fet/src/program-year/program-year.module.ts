import { Module } from '@nestjs/common';
import { ProgramYearController } from './program-year.controller';
import { ProgramYearService } from './program-year.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgramYear } from './program-year.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProgramYear])],
  controllers: [ProgramYearController],
  providers: [ProgramYearService]
})
export class ProgramYearModule {}
