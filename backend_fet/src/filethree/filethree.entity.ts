// filethree.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';
import { FileTwo } from '../filetwo/filetwo.entity';
import { FileFour } from 'src/filefour/filefour.entity';

@Entity()
export class FileThree {
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

    @ManyToOne(() => FileTwo, fileTwo => fileTwo.fileThree, { nullable: false })
    fileTwo: FileTwo | null;

    @OneToMany(() => FileFour, fileFour => fileFour.fileThree, {nullable: true})
    fileFour: FileFour[];

}
