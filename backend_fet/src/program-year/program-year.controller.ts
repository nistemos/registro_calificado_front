// program-year.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, UsePipes, ValidationPipe, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiNotFoundResponse, ApiConflictResponse, ApiCreatedResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { ProgramYearService } from './program-year.service';
import { CreateProgramYearDto } from './create-program-year.dto';
import { UserGuard } from 'src/user/user.guard';


@ApiBearerAuth()
@UsePipes(new ValidationPipe({ transform: true })) 
@ApiTags('program-years')
@Controller('program-years')
export class ProgramYearController {
  constructor(private readonly programYearService: ProgramYearService) {}

  @Get()
  @UseGuards(new UserGuard(['admin','teacher']))
  @ApiResponse({ status: 200, description: 'List of program years found.' })
  async findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10, @Query('program') program: number){
    return this.programYearService.findAll(page, limit,program);
  }

  @Get(':id')
  @UseGuards(new UserGuard(['admin','teacher']))
  @ApiResponse({ status: 200, description: 'Program year found.' })
  @ApiNotFoundResponse({ description: 'Program year not found.' })
  async findOne(@Param('id') id: number){
    return this.programYearService.findOne(id);
  }

  @Post()
  @UseGuards(new UserGuard(['admin']))
  @HttpCode(201)
  @ApiCreatedResponse({ description: 'Program year created.' })
  @ApiConflictResponse({ description: 'Program year name already exists.' })
  async create(@Body() createProgramYearDto: CreateProgramYearDto){
    return this.programYearService.create(createProgramYearDto);
  }

  @Put(':id')
  @UseGuards(new UserGuard(['admin']))
  @ApiResponse({ status: 200, description: 'Program year updated.' })
  @ApiNotFoundResponse({ description: 'Program year not found.' })
  @ApiConflictResponse({ description: 'Program year name already exists.' })
  @ApiBody({ type: CreateProgramYearDto })
  async update(@Param('id') id: number, @Body() updateProgramYearDto: CreateProgramYearDto){
    return this.programYearService.update(id, updateProgramYearDto);
  }

  @Delete(':id')
  @UseGuards(new UserGuard(['admin']))
  @ApiResponse({ status: 200, description: 'Program year deleted.' })
  @ApiNotFoundResponse({ description: 'Program year not found.' })
  async remove(@Param('id') id: number){
    return this.programYearService.remove(id);
  }
}
