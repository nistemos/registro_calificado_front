import { MulterField } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class pushFile {
    @ApiProperty({ type: 'string', format: 'binary' }) // Esto indica a Swagger que se espera un archivo
    @IsOptional()
    @IsNotEmpty()
    file: any;
}