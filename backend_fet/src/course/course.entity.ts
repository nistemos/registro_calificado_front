// course.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';
import { ProgramYear } from 'src/program-year/program-year.entity';

@Entity()
export class Course {
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

    @Column()
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    credits: number;

    @ManyToOne(() => ProgramYear, programYear => programYear.courses, { nullable: false })
    programsYear: ProgramYear | null;

}
