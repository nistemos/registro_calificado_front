// program-year.service.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProgramYear } from './program-year.entity';
import { CreateProgramYearDto } from './create-program-year.dto';

@Injectable()
export class ProgramYearService {
  constructor(
    @InjectRepository(ProgramYear)
    private readonly programYearRepository: Repository<ProgramYear>,
  ) {}

  async findAll(page = 1, limit = 10, program: number) {
    const queryBuilder =
      this.programYearRepository.createQueryBuilder('programYear');

    if (program) {
      queryBuilder.where('programYear.programId = :programId', {
        programId: program,
      });
    }

    const totalCourses = await queryBuilder.getCount();
    const totalPages = Math.ceil(totalCourses / limit);

    const courses = await queryBuilder
      .take(limit)
      .skip((page - 1) * limit)
      .getMany();

    return {
      message: 'Program Year found.',
      data: { courses, totalPages, totalCourses },
      status: HttpStatus.OK,
    };
  }

  async findOne(id: number) {
    const programYear = await this.programYearRepository.findOne({
      where: { id },
    });
    if (!programYear) {
      throw new HttpException(
        `Program year with ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return {
      message: 'Program year found.',
      data: programYear,
      status: HttpStatus.OK,
    };
  }

  async create(createProgramYearDto: CreateProgramYearDto) {
    const existingCourse = await this.programYearRepository.findOne({
      where: {
        name: createProgramYearDto.name,
        program: { id: createProgramYearDto.program },
      },
    });
    if (existingCourse) {
      throw new HttpException(
        'Program year name already exists.',
        HttpStatus.CONFLICT,
      );
    }

    try {
      const newProgramYear = this.programYearRepository.create(
        createProgramYearDto as unknown,
      );
      const savedProgramYear =
        await this.programYearRepository.save(newProgramYear);
      return {
        message: 'Program year created.',
        data: savedProgramYear,
        status: HttpStatus.CREATED,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }
  }

  async update(id: number, updateProgramYearDto: CreateProgramYearDto) {
    const programYear = await this.programYearRepository.findOne({
      where: { id },
    });
    if (!programYear) {
      throw new HttpException(
        `Program year with ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    try {
      Object.assign(programYear, updateProgramYearDto);
      await this.programYearRepository.save(programYear);

      return {
        message: 'Program year updated.',
        data: programYear,
        status: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }
  }

  async remove(id: number) {
    const programYear = await this.programYearRepository.findOne({
      where: { id },
    });
    if (!programYear) {
      throw new HttpException(
        `Program year with ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.programYearRepository.delete(id);

    return {
      message: 'Program year deleted.',
      data: null,
      status: HttpStatus.OK,
    };
  }
}
