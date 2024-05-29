// filethree.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param, Query, HttpCode, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiNotFoundResponse, ApiConflictResponse, ApiCreatedResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { FilethreeService } from './filethree.service';
import { CreateFileThreeDto } from './filethree.dto';
import { UserGuard } from '../user/user.guard';

@ApiBearerAuth()
@UsePipes(new ValidationPipe({ transform: true }))
@ApiTags('filethree')
@Controller('filethree')
export class FilethreeController {
  constructor(private readonly filethreeService: FilethreeService) {}

  @Get()
  @UseGuards(new UserGuard(['admin', 'teacher']))
  @ApiResponse({ status: 200, description: 'List of FileThrees found.' })
  async findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10, @Query('fileTwoId') fileTwoId: number) {
    return this.filethreeService.findAll(page, limit, fileTwoId);
  }

  @Get(':id')
  @UseGuards(new UserGuard(['admin', 'teacher']))
  @ApiResponse({ status: 200, description: 'FileThree found.' })
  @ApiNotFoundResponse({ description: 'FileThree not found.' })
  async findOne(@Param('id') id: number) {
    return this.filethreeService.findOne(id);
  }

  @Post()
  @UseGuards(new UserGuard(['admin']))
  @HttpCode(201)
  @ApiCreatedResponse({ description: 'FileThree created.' })
  @ApiConflictResponse({ description: 'FileThree name already exists.' })
  @ApiBody({ type: CreateFileThreeDto })
  async create(@Body() createFileThreeDto: CreateFileThreeDto) {
    return this.filethreeService.create(createFileThreeDto);
  }

  @Put(':id')
  @UseGuards(new UserGuard(['admin']))
  @ApiResponse({ status: 200, description: 'FileThree updated.' })
  @ApiNotFoundResponse({ description: 'FileThree not found.' })
  @ApiConflictResponse({ description: 'FileThree name already exists.' })
  @ApiBody({ type: CreateFileThreeDto })
  async update(@Param('id') id: number, @Body() updateFileThreeDto: CreateFileThreeDto) {
    return this.filethreeService.update(id, updateFileThreeDto);
  }

  @Delete(':id')
  @UseGuards(new UserGuard(['admin']))
  @ApiResponse({ status: 200, description: 'FileThree deleted.' })
  @ApiNotFoundResponse({ description: 'FileThree not found.' })
  async remove(@Param('id') id: number) {
    return this.filethreeService.remove(id);
  }
}
