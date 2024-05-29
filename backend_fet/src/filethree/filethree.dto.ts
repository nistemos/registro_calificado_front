// create-filethree.dto.ts
import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFileThreeDto {
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
    fileTwo: number;
}
