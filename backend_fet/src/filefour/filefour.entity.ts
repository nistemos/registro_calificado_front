// filefour.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';
import { FileThree } from '../filethree/filethree.entity';

@Entity()
export class FileFour {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    @IsString()
    name: string;

    @Column()
    @IsNotEmpty()
    @IsString()
    description: string;

    @ManyToOne(() => FileThree, fileThree => fileThree.fileFour, { nullable: false })
    fileThree: FileThree | null;
}
