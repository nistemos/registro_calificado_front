// user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';
import { Course } from 'src/course/course.entity';
import { ProgramYear } from 'src/program-year/program-year.entity';

@Entity()
export class Program {
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

    @OneToMany(() => ProgramYear, programYear => programYear.program, {nullable: true})
    programYear: ProgramYear[];
}
