import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';
import { Program } from './program.entity';
import { CreateProgramDto } from './program.dto';

@Injectable()
export class ProgramService {
  constructor(
    @InjectRepository(Program)
    private readonly programRepository: Repository<Program>,
  ) {}

  async findAll(page = 1, limit = 10) {
    const totalPrograms = await this.programRepository.count();
    const totalPages = Math.ceil(totalPrograms / limit);

    const options: FindManyOptions<Program> = {
      take: limit,
      skip: (page - 1) * limit,
    };
    const programs = await this.programRepository.find(options);
    const data = {
        programs,
        totalPages,
        totalPrograms
    }
    return {
      message: 'Programs found.',
      data,
      status: HttpStatus.OK,
    };
  }

  async findOne(id: number) {
    const program = await this.programRepository.findOne({where:{id}});
    if (!program) {
      throw new HttpException(`Program with ID ${id} not found`, HttpStatus.NOT_FOUND);
    }
    return { message: 'Program found.', data: program, status: HttpStatus.OK };
  }

  async create(createProgramDto: CreateProgramDto){
    const { name } = createProgramDto;

    // Verificar si el programa ya existe en la base de datos
    const existingProgram = await this.programRepository.findOne({ where: { name } });
    if (existingProgram) {
      throw new HttpException('Program already exists.', HttpStatus.CONFLICT);
    }

    const newProgram = this.programRepository.create(createProgramDto);
    const savedProgram = await this.programRepository.save(newProgram);
    return { message: 'Program created.', data: savedProgram, status: HttpStatus.CREATED };
  }

  async update(id: number, updateProgramDto: CreateProgramDto) {
    const program = await this.programRepository.findOne({where:{id}});

    // Verificar si el programa ya existe en otro programa
    const { name } = updateProgramDto;
    if (name && name !== program.name) {
      const existingProgram = await this.programRepository.findOne({ where: { name } });
      if (existingProgram) {
        throw new HttpException(`Program already exists.`, HttpStatus.CONFLICT);
      }
    }

    // Actualizar los campos del programa y guardar los cambios
    Object.assign(program, updateProgramDto);
    await this.programRepository.save(program);

    return { message: 'Program updated.', data: program, status: HttpStatus.OK };
  }

  async remove(id: number) {
    const program = await this.programRepository.findOne({where:{id}});

    // Si el programa existe, procedemos a eliminarlo
    if (program) {
      await this.programRepository.delete(id);
      return { message: 'Program deleted.', data: null, status: HttpStatus.OK };
    } else {
      throw new HttpException(`Program with ID ${id} not found`, HttpStatus.NOT_FOUND);
    }
  }
}
