import { Controller, Get, Post, Put, Delete, Body, Param, Query, HttpCode, ValidationPipe, UsePipes, UseGuards } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiNotFoundResponse, ApiConflictResponse, ApiCreatedResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto, LoginUserDto } from './user.dto';
import { UserGuard } from './user.guard';

@ApiBearerAuth()
@UsePipes(new ValidationPipe({ transform: true })) 
@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(new UserGuard(['admin','teacher']))
  @ApiResponse({ status: 200, description: 'List of users found.' })
  async findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10){
    return this.userService.findAll(page, limit);
  }

  @Get(':id')
  @UseGuards(new UserGuard(['admin','teacher']))
  @ApiResponse({ status: 200, description: 'User found.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  async findOne(@Param('id') id: number){
    return this.userService.findOne(id);
  }

  @Post()
  @UseGuards(new UserGuard(['admin']))
  @HttpCode(201)
  @ApiCreatedResponse({ description: 'User created.' })
  @ApiConflictResponse({ description: 'Email already exists.' })
  @ApiBody({ type: CreateUserDto })
  async create(@Body() createUserDto: CreateUserDto){
    return this.userService.create(createUserDto);
  }

  @Post('/login')
  @HttpCode(201)
  @ApiCreatedResponse({ description: 'User logeado.' })
  @ApiConflictResponse({ description: 'Email already exists or Clave no matchs' })
  @ApiBody({ type: LoginUserDto })
  async login(@Body() loginUserDto: LoginUserDto){
    return this.userService.login(loginUserDto);
  }

  @Put(':id')
  @UseGuards(new UserGuard(['admin']))
  @ApiResponse({ status: 200, description: 'User updated.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @ApiConflictResponse({ description: 'Email already exists.' })
  @ApiBody({ type: CreateUserDto })
  async update(@Param('id') id: number, @Body() updateUserDto: CreateUserDto){
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(new UserGuard(['admin','teacher']))
  @ApiResponse({ status: 200, description: 'User deleted.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  async remove(@Param('id') id: number){
    return this.userService.remove(id);
  }
}
