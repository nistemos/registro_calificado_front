// course.service.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './course.entity';
import { CreateCourseDto } from './create-course.dto';

@Injectable()
export class CourseService {
    constructor(
        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>,
    ) {}

    async findAll(page = 1, limit = 10, programYearId: number) {
        const queryBuilder = this.courseRepository.createQueryBuilder('course');
    
        if (programYearId) {
            queryBuilder
                .leftJoinAndSelect('course.programsYear', 'programYear')
                .where('programYear.id = :programYearId', { programYearId });
        }
    
        const totalCourses = await queryBuilder.getCount();
        const totalPages = Math.ceil(totalCourses / limit);
    
        const courses = await queryBuilder
            .take(limit)
            .skip((page - 1) * limit)
            .getMany();
    
        return {
            message: 'Courses found.',
            data: { courses, totalPages, totalCourses },
            status: HttpStatus.OK,
        };
    }
    

    async findOne(id: number) {
        const course = await this.courseRepository.findOne({where:{id}});
        if (!course) {
            throw new HttpException(`Course with ID ${id} not found`, HttpStatus.NOT_FOUND);
        }
        return {
            message: 'Course found.',
            data: course,
            status: HttpStatus.OK,
        };
    }

    async create(createCourseDto: CreateCourseDto) {
        const existingCourse = await this.courseRepository.findOne({ where: { name:createCourseDto.name, programsYear:{id:createCourseDto.programsYear} } });
        if (existingCourse) {
            throw new HttpException('Course name already exists.', HttpStatus.CONFLICT);
        }

        const newCourse = this.courseRepository.create(createCourseDto as unknown);
        const savedCourse = await this.courseRepository.save(newCourse);
        return {
            message: 'Course created.',
            data: savedCourse,
            status: HttpStatus.CREATED,
        };
    }

    async update(id: number, updateCourseDto: CreateCourseDto) {
        const course = await this.courseRepository.findOne({where:{id}});
        if (!course) {
            throw new HttpException(`Course with ID ${id} not found`, HttpStatus.NOT_FOUND);
        }

        const { name } = updateCourseDto;
        if (name !== course.name) {
            const existingCourse = await this.courseRepository.findOne({ where: { name } });
            if (existingCourse) {
                throw new HttpException(`Course with name ${name} already exists.`, HttpStatus.CONFLICT);
            }
        }

        Object.assign(course, updateCourseDto);
        await this.courseRepository.save(course);

        return {
            message: 'Course updated.',
            data: course,
            status: HttpStatus.OK,
        };
    }

    async remove(id: number) {
        const course = await this.courseRepository.findOne({where:{id}});
        if (!course) {
            throw new HttpException(`Course with ID ${id} not found`, HttpStatus.NOT_FOUND);
        }

        await this.courseRepository.delete(id);

        return {
            message: 'Course deleted.',
            data: null,
            status: HttpStatus.OK,
        };
    }
}
