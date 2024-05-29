// filethree.service.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileThree } from './filethree.entity';
import { CreateFileThreeDto } from './filethree.dto';

@Injectable()
export class FilethreeService {
    constructor(
        @InjectRepository(FileThree)
        private readonly filethreeRepository: Repository<FileThree>,
    ) {}

    async findAll(page = 1, limit = 10, fileTwoId: number) {
        const queryBuilder = this.filethreeRepository.createQueryBuilder('filethree');
    
        if (fileTwoId) {
            queryBuilder
                .leftJoinAndSelect('filethree.fileTwo', 'fileTwo')
                .where('fileTwo.id = :fileTwoId', { fileTwoId });
        }
    
        const totalFilethrees = await queryBuilder.getCount();
        const totalPages = Math.ceil(totalFilethrees / limit);
    
        const filethrees = await queryBuilder
            .take(limit)
            .skip((page - 1) * limit)
            .getMany();
    
        return {
            message: 'FileThrees found.',
            data: { filethrees, totalPages, totalFilethrees },
            status: HttpStatus.OK,
        };
    }

    async findOne(id: number) {
        const filethree = await this.filethreeRepository.findOne({ where: { id } });
        if (!filethree) {
            throw new HttpException(`FileThree with ID ${id} not found`, HttpStatus.NOT_FOUND);
        }
        return {
            message: 'FileThree found.',
            data: filethree,
            status: HttpStatus.OK,
        };
    }

    async create(createFileThreeDto: CreateFileThreeDto) {
        const existingFileThree = await this.filethreeRepository.findOne({ 
            where: { 
                name: createFileThreeDto.name, 
                fileTwo: { id: createFileThreeDto.fileTwo } 
            } 
        });
        if (existingFileThree) {
            throw new HttpException('FileThree name already exists.', HttpStatus.CONFLICT);
        }

        const newFileThree = this.filethreeRepository.create(createFileThreeDto as unknown);
        const savedFileThree = await this.filethreeRepository.save(newFileThree);
        return {
            message: 'FileThree created.',
            data: savedFileThree,
            status: HttpStatus.CREATED,
        };
    }

    async update(id: number, updateFileThreeDto: CreateFileThreeDto) {
        const filethree = await this.filethreeRepository.findOne({ where: { id } });
        if (!filethree) {
            throw new HttpException(`FileThree with ID ${id} not found`, HttpStatus.NOT_FOUND);
        }

        const { name } = updateFileThreeDto;
        if (name !== filethree.name) {
            const existingFileThree = await this.filethreeRepository.findOne({ where: { name } });
            if (existingFileThree) {
                throw new HttpException(`FileThree with name ${name} already exists.`, HttpStatus.CONFLICT);
            }
        }

        Object.assign(filethree, updateFileThreeDto);
        await this.filethreeRepository.save(filethree);

        return {
            message: 'FileThree updated.',
            data: filethree,
            status: HttpStatus.OK,
        };
    }

    async remove(id: number) {
        const filethree = await this.filethreeRepository.findOne({ where: { id } });
        if (!filethree) {
            throw new HttpException(`FileThree with ID ${id} not found`, HttpStatus.NOT_FOUND);
        }

        await this.filethreeRepository.delete(id);

        return {
            message: 'FileThree deleted.',
            data: null,
            status: HttpStatus.OK,
        };
    }
}
