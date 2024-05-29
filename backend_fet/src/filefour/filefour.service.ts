// filefour.service.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileFour } from './filefour.entity';
import { CreateFileFourDto } from './filefour.dto';

@Injectable()
export class FilefourService {
    constructor(
        @InjectRepository(FileFour)
        private readonly filefourRepository: Repository<FileFour>,
    ) {}

    async findAll(page = 1, limit = 10, fileThreeId: number) {
        const queryBuilder = this.filefourRepository.createQueryBuilder('filefour');
    
        if (fileThreeId) {
            queryBuilder
                .leftJoinAndSelect('filefour.fileThree', 'fileThree')
                .where('fileThree.id = :fileThreeId', { fileThreeId });
        }
    
        const totalFilefours = await queryBuilder.getCount();
        const totalPages = Math.ceil(totalFilefours / limit);
    
        const filefours = await queryBuilder
            .take(limit)
            .skip((page - 1) * limit)
            .getMany();
    
        return {
            message: 'FileFours found.',
            data: { filefours, totalPages, totalFilefours },
            status: HttpStatus.OK,
        };
    }

    async findOne(id: number) {
        const filefour = await this.filefourRepository.findOne({ where: { id } });
        if (!filefour) {
            throw new HttpException(`FileFour with ID ${id} not found`, HttpStatus.NOT_FOUND);
        }
        return {
            message: 'FileFour found.',
            data: filefour,
            status: HttpStatus.OK,
        };
    }

    async create(createFileFourDto: CreateFileFourDto) {
        const existingFileFour = await this.filefourRepository.findOne({ 
            where: { 
                name: createFileFourDto.name, 
                fileThree: { id: createFileFourDto.fileThree } 
            } 
        });
        if (existingFileFour) {
            throw new HttpException('FileFour name already exists.', HttpStatus.CONFLICT);
        }

        const newFileFour = this.filefourRepository.create(createFileFourDto as unknown);
        const savedFileFour = await this.filefourRepository.save(newFileFour);
        return {
            message: 'FileFour created.',
            data: savedFileFour,
            status: HttpStatus.CREATED,
        };
    }

    async update(id: number, updateFileFourDto: CreateFileFourDto) {
        const filefour = await this.filefourRepository.findOne({ where: { id } });
        if (!filefour) {
            throw new HttpException(`FileFour with ID ${id} not found`, HttpStatus.NOT_FOUND);
        }

        const { name } = updateFileFourDto;
        if (name !== filefour.name) {
            const existingFileFour = await this.filefourRepository.findOne({ where: { name } });
            if (existingFileFour) {
                throw new HttpException(`FileFour with name ${name} already exists.`, HttpStatus.CONFLICT);
            }
        }

        Object.assign(filefour, updateFileFourDto);
        await this.filefourRepository.save(filefour);

        return {
            message: 'FileFour updated.',
            data: filefour,
            status: HttpStatus.OK,
        };
    }

    async remove(id: number) {
        const filefour = await this.filefourRepository.findOne({ where: { id } });
        if (!filefour) {
            throw new HttpException(`FileFour with ID ${id} not found`, HttpStatus.NOT_FOUND);
        }

        await this.filefourRepository.delete(id);

        return {
            message: 'FileFour deleted.',
            data: null,
            status: HttpStatus.OK,
        };
    }
}
