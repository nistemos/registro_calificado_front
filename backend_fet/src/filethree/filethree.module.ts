import { Module } from '@nestjs/common';
import { FilethreeController } from './filethree.controller';
import { FilethreeService } from './filethree.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileThree } from './filethree.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FileThree])],
  controllers: [FilethreeController],
  providers: [FilethreeService]
})
export class FilethreeModule {}
