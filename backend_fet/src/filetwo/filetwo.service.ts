// filetwo.service.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileTwo } from './filetwo.entity';
import { CreateFileTwoDto } from './filetwo.dto';

@Injectable()
export class FiletwoService {
    constructor(
        @InjectRepository(FileTwo)
        private readonly filetwoRepository: Repository<FileTwo>,
    ) {}

    async findAll(page = 1, limit = 10, courseId: number) {
        const queryBuilder = this.filetwoRepository.createQueryBuilder('filetwo');
    
        if (courseId) {
            queryBuilder
                .leftJoinAndSelect('filetwo.course', 'course')
                .where('course.id = :courseId', { courseId });
        }
    
        const totalFiletwos = await queryBuilder.getCount();
        const totalPages = Math.ceil(totalFiletwos / limit);
    
        const filetwos = await queryBuilder
            .take(limit)
            .skip((page - 1) * limit)
            .getMany();
    
        return {
            message: 'FileTwos found.',
            data: { filetwos, totalPages, totalFiletwos },
            status: HttpStatus.OK,
        };
    }

    async findOne(id: number) {
        const filetwo = await this.filetwoRepository.findOne({ where: { id } });
        if (!filetwo) {
            throw new HttpException(`FileTwo with ID ${id} not found`, HttpStatus.NOT_FOUND);
        }
        return {
            message: 'FileTwo found.',
            data: filetwo,
            status: HttpStatus.OK,
        };
    }

    async create(createFileTwoDto: CreateFileTwoDto) {
        const existingFileTwo = await this.filetwoRepository.findOne({ 
            where: { 
                name: createFileTwoDto.name, 
                course: { id: createFileTwoDto.course } 
            } 
        });
        if (existingFileTwo) {
            throw new HttpException('FileTwo name already exists.', HttpStatus.CONFLICT);
        }

        const newFileTwo = this.filetwoRepository.create(createFileTwoDto as unknown);
        const savedFileTwo = await this.filetwoRepository.save(newFileTwo);
        return {
            message: 'FileTwo created.',
            data: savedFileTwo,
            status: HttpStatus.CREATED,
        };
    }

    async update(id: number, updateFileTwoDto: CreateFileTwoDto) {
        const filetwo = await this.filetwoRepository.findOne({ where: { id } });
        if (!filetwo) {
            throw new HttpException(`FileTwo with ID ${id} not found`, HttpStatus.NOT_FOUND);
        }

        const { name } = updateFileTwoDto;
        if (name !== filetwo.name) {
            const existingFileTwo = await this.filetwoRepository.findOne({ where: { name } });
            if (existingFileTwo) {
                throw new HttpException(`FileTwo with name ${name} already exists.`, HttpStatus.CONFLICT);
            }
        }

        Object.assign(filetwo, updateFileTwoDto);
        await this.filetwoRepository.save(filetwo);

        return {
            message: 'FileTwo updated.',
            data: filetwo,
            status: HttpStatus.OK,
        };
    }

    async remove(id: number) {
        const filetwo = await this.filetwoRepository.findOne({ where: { id } });
        if (!filetwo) {
            throw new HttpException(`FileTwo with ID ${id} not found`, HttpStatus.NOT_FOUND);
        }

        await this.filetwoRepository.delete(id);

        return {
            message: 'FileTwo deleted.',
            data: null,
            status: HttpStatus.OK,
        };
    }
}
