// course.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';
import { Course } from 'src/course/course.entity';
import { FileThree } from 'src/filethree/filethree.entity';

@Entity()
export class FileTwo {
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

    @ManyToOne(() => Course, course => course.fileTwo, { nullable: false })
    course: Course | null;

    @OneToMany(() => FileThree, fileThree => fileThree.fileTwo, {nullable: true})
    fileThree: FileThree[];

}
