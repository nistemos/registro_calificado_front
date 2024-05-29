// create-course.dto.ts
import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ProgramYear } from 'src/program-year/program-year.entity';

export class CreateFileTwoDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    name: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    description: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @ApiProperty()
    course: number;
}
