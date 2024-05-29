// filefour.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param, Query, HttpCode, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiNotFoundResponse, ApiConflictResponse, ApiCreatedResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { FilefourService } from './filefour.service';
import { CreateFileFourDto } from './filefour.dto';
import { UserGuard } from '../user/user.guard';

@ApiBearerAuth()
@UsePipes(new ValidationPipe({ transform: true }))
@ApiTags('filefour')
@Controller('filefour')
export class FilefourController {
  constructor(private readonly filefourService: FilefourService) {}

  @Get()
  @UseGuards(new UserGuard(['admin', 'teacher']))
  @ApiResponse({ status: 200, description: 'List of FileFours found.' })
  async findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10, @Query('fileThreeId') fileThreeId: number) {
    return this.filefourService.findAll(page, limit, fileThreeId);
  }

  @Get(':id')
  @UseGuards(new UserGuard(['admin', 'teacher']))
  @ApiResponse({ status: 200, description: 'FileFour found.' })
  @ApiNotFoundResponse({ description: 'FileFour not found.' })
  async findOne(@Param('id') id: number) {
    return this.filefourService.findOne(id);
  }

  @Post()
  @UseGuards(new UserGuard(['admin']))
  @HttpCode(201)
  @ApiCreatedResponse({ description: 'FileFour created.' })
  @ApiConflictResponse({ description: 'FileFour name already exists.' })
  @ApiBody({ type: CreateFileFourDto })
  async create(@Body() createFileFourDto: CreateFileFourDto) {
    return this.filefourService.create(createFileFourDto);
  }

  @Put(':id')
  @UseGuards(new UserGuard(['admin']))
  @ApiResponse({ status: 200, description: 'FileFour updated.' })
  @ApiNotFoundResponse({ description: 'FileFour not found.' })
  @ApiConflictResponse({ description: 'FileFour name already exists.' })
  @ApiBody({ type: CreateFileFourDto })
  async update(@Param('id') id: number, @Body() updateFileFourDto: CreateFileFourDto) {
    return this.filefourService.update(id, updateFileFourDto);
  }

  @Delete(':id')
  @UseGuards(new UserGuard(['admin']))
  @ApiResponse({ status: 200, description: 'FileFour deleted.' })
  @ApiNotFoundResponse({ description: 'FileFour not found.' })
  async remove(@Param('id') id: number) {
    return this.filefourService.remove(id);
  }
}
