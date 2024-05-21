import { Controller, Get, Post, Put, Delete, Body, Param, Query, HttpCode, ValidationPipe, UsePipes, UseGuards } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiNotFoundResponse, ApiConflictResponse, ApiCreatedResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { ProgramService } from './program.service';
import { CreateProgramDto } from './program.dto';
import { UserGuard } from '../user/user.guard'

@ApiBearerAuth()
@UsePipes(new ValidationPipe({ transform: true })) 
@ApiTags('programs')
@Controller('programs')
export class ProgramController {
  constructor(private readonly programService: ProgramService) {}

  @Get()
  @UseGuards(new UserGuard(['admin','teacher']))
  @ApiResponse({ status: 200, description: 'List of programs found.' })
  async findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10){
    return this.programService.findAll(page, limit);
  }

  @Get(':id')
  @UseGuards(new UserGuard(['admin','teacher']))
  @ApiResponse({ status: 200, description: 'Program found.' })
  @ApiNotFoundResponse({ description: 'Program not found.' })
  async findOne(@Param('id') id: number){
    return this.programService.findOne(id);
  }

  @Post()
  @UseGuards(new UserGuard(['admin']))
  @HttpCode(201)
  @ApiCreatedResponse({ description: 'Program created.' })
  @ApiConflictResponse({ description: 'Program name already exists.' })
  @ApiBody({ type: CreateProgramDto })
  async create(@Body() createProgramDto: CreateProgramDto){
    return this.programService.create(createProgramDto);
  }

  @Put(':id')
  @UseGuards(new UserGuard(['admin']))
  @ApiResponse({ status: 200, description: 'Program updated.' })
  @ApiNotFoundResponse({ description: 'Program not found.' })
  @ApiConflictResponse({ description: 'Program name already exists.' })
  @ApiBody({ type: CreateProgramDto })
  async update(@Param('id') id: number, @Body() updateProgramDto: CreateProgramDto){
    return this.programService.update(id, updateProgramDto);
  }

  @Delete(':id')
  @UseGuards(new UserGuard(['admin']))
  @ApiResponse({ status: 200, description: 'Program deleted.' })
  @ApiNotFoundResponse({ description: 'Program not found.' })
  async remove(@Param('id') id: number){
    return this.programService.remove(id);
  }
}
