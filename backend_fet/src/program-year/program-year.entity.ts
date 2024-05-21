// program-year.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';
import { Program } from 'src/program/program.entity';
import { Course } from 'src/course/course.entity';

@Entity()
export class ProgramYear {
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

    @ManyToOne(() => Program, program => program.programYear, { nullable: true })
    program: Program | null;

    @OneToMany(() => Course, course => course.programsYear, {nullable: true})
    courses: Course[];

}
