import { Controller, Get, Post, Put, Delete, Body, Param, Query, HttpCode, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiNotFoundResponse, ApiConflictResponse, ApiCreatedResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { FiletwoService } from './filetwo.service';
import { CreateFileTwoDto } from './filetwo.dto';
import { UserGuard } from '../user/user.guard';

@ApiBearerAuth()
@UsePipes(new ValidationPipe({ transform: true }))
@ApiTags('filetwo')
@Controller('filetwo')
export class FiletwoController {
  constructor(private readonly filetwoService: FiletwoService) {}

  @Get()
  @UseGuards(new UserGuard(['admin', 'teacher']))
  @ApiResponse({ status: 200, description: 'List of FileTwos found.' })
  async findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10, @Query('courseId') courseId: number) {
    return this.filetwoService.findAll(page, limit, courseId);
  }

  @Get(':id')
  @UseGuards(new UserGuard(['admin', 'teacher']))
  @ApiResponse({ status: 200, description: 'FileTwo found.' })
  @ApiNotFoundResponse({ description: 'FileTwo not found.' })
  async findOne(@Param('id') id: number) {
    return this.filetwoService.findOne(id);
  }

  @Post()
  @UseGuards(new UserGuard(['admin']))
  @HttpCode(201)
  @ApiCreatedResponse({ description: 'FileTwo created.' })
  @ApiConflictResponse({ description: 'FileTwo name already exists.' })
  @ApiBody({ type: CreateFileTwoDto })
  async create(@Body() createFileTwoDto: CreateFileTwoDto) {
    return this.filetwoService.create(createFileTwoDto);
  }

  @Put(':id')
  @UseGuards(new UserGuard(['admin']))
  @ApiResponse({ status: 200, description: 'FileTwo updated.' })
  @ApiNotFoundResponse({ description: 'FileTwo not found.' })
  @ApiConflictResponse({ description: 'FileTwo name already exists.' })
  @ApiBody({ type: CreateFileTwoDto })
  async update(@Param('id') id: number, @Body() updateFileTwoDto: CreateFileTwoDto) {
    return this.filetwoService.update(id, updateFileTwoDto);
  }

  @Delete(':id')
  @UseGuards(new UserGuard(['admin']))
  @ApiResponse({ status: 200, description: 'FileTwo deleted.' })
  @ApiNotFoundResponse({ description: 'FileTwo not found.' })
  async remove(@Param('id') id: number) {
    return this.filetwoService.remove(id);
  }
}
