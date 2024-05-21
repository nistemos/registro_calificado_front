import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { UserRole } from './user.entity';

export class CreateUserDto {
  @ApiProperty({ description: 'Email address of the user.', example: 'example@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Role of the user.', enum: UserRole })
  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole;

  @ApiProperty({ description: 'Full name of the user.', example: 'John Doe' })
  @IsNotEmpty()
  fullname: string;

  @ApiProperty({ description: 'Clave of the user.', example: 'Clave1234' })
  @IsNotEmpty()
  clave: string;
}


export class LoginUserDto {
  @ApiProperty({ description: 'Email address of the user.', example: 'example@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Clave of the user.', example: 'Clave1234' })
  @IsNotEmpty()
  clave: string;
}