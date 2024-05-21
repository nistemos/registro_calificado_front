// course.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param, Query, HttpCode, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiNotFoundResponse, ApiConflictResponse, ApiCreatedResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { CourseService } from './course.service';
import { CreateCourseDto } from './create-course.dto';
import { UserGuard } from '../user/user.guard';
import { Program } from 'src/program/program.entity';

@ApiBearerAuth()
@UsePipes(new ValidationPipe({ transform: true })) 
@ApiTags('courses')
@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  @UseGuards(new UserGuard(['admin','teacher']))
  @ApiResponse({ status: 200, description: 'List of courses found.' })
  async findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10, @Query('programYeardId') programYeardId: number){
    return this.courseService.findAll(page, limit, programYeardId);
  }

  @Get(':id')
  @UseGuards(new UserGuard(['admin','teacher']))
  @ApiResponse({ status: 200, description: 'Course found.' })
  @ApiNotFoundResponse({ description: 'Course not found.' })
  async findOne(@Param('id') id: number){
    return this.courseService.findOne(id);
  }

  @Post()
  @UseGuards(new UserGuard(['admin']))
  @HttpCode(201)
  @ApiCreatedResponse({ description: 'Course created.' })
  @ApiConflictResponse({ description: 'Course name already exists.' })
  @ApiBody({ type: CreateCourseDto })
  async create(@Body() createCourseDto: CreateCourseDto){
    return this.courseService.create(createCourseDto);
  }

  @Put(':id')
  @UseGuards(new UserGuard(['admin']))
  @ApiResponse({ status: 200, description: 'Course updated.' })
  @ApiNotFoundResponse({ description: 'Course not found.' })
  @ApiConflictResponse({ description: 'Course name already exists.' })
  @ApiBody({ type: CreateCourseDto })
  async update(@Param('id') id: number, @Body() updateCourseDto: CreateCourseDto){
    return this.courseService.update(id, updateCourseDto);
  }

  @Delete(':id')
  @UseGuards(new UserGuard(['admin']))
  @ApiResponse({ status: 200, description: 'Course deleted.' })
  @ApiNotFoundResponse({ description: 'Course not found.' })
  async remove(@Param('id') id: number){
    return this.courseService.remove(id);
  }
}
