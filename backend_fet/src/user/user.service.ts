import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto, LoginUserDto } from './user.dto';
import * as bcrypt from 'bcrypt';
import { generateToken } from 'src/utils/auth';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(page = 1, limit = 10) {
    const totalUsers = await this.userRepository.count();
    const totalPages = Math.ceil(totalUsers / limit);

    const options: FindManyOptions<User> = {
      take: limit,
      skip: (page - 1) * limit,
    };
    const users = await this.userRepository.find(options);
    const data = {
      users,
      totalPages,
      totalUsers,
    };
    return {
      message: 'Users found.',
      data,
      status: HttpStatus.OK,
    };
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException(
        `User with ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return { message: 'User found.', data: user, status: HttpStatus.OK };
  }

  async create(createUserDto: CreateUserDto) {
    const { email } = createUserDto;

    // Verificar si el correo electrónico ya existe en la base de datos
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new HttpException('Email already exists.', HttpStatus.CONFLICT);
    }

    createUserDto.clave = await bcrypt.hash(createUserDto.clave, 10);
    const newUser = this.userRepository.create(createUserDto);
    const savedUser = await this.userRepository.save(newUser);
    return {
      message: 'User created.',
      data: savedUser,
      status: HttpStatus.CREATED,
    };
  }

  async update(id: number, updateUserDto: CreateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });

    // Verificar si el correo electrónico ya existe en otro usuario
    const { email } = updateUserDto;
    if (email && email !== user.email) {
      const existingUser = await this.userRepository.findOne({
        where: { email },
      });
      if (existingUser) {
        throw new HttpException(`Email already exists.`, HttpStatus.CONFLICT);
      }
    }
    if (updateUserDto.clave) {
      updateUserDto.clave = await bcrypt.hash(updateUserDto.clave, 10);
    }

    // Actualizar los campos del usuario y guardar los cambios
    Object.assign(user, updateUserDto);
    await this.userRepository.save(user);

    return { message: 'User updated.', data: user, status: HttpStatus.OK };
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });

    // Si el usuario existe, procedemos a eliminarlo
    if (user) {
      await this.userRepository.delete(id);
      return { message: 'User deleted.', data: null, status: HttpStatus.OK };
    } else {
      throw new HttpException(
        `User with ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.userRepository.findOne({
      where: { email: loginUserDto.email },
    });

    // Si el usuario existe, procedemos a eliminarlo
    if (user) {
      const access = await bcrypt.compare(loginUserDto.clave, user.clave);
      if (access) {
        delete user.clave;
        const token = generateToken({ user });
        return {
          message: 'Authorized user.',
          data: { user, token },
          status: HttpStatus.OK,
        };
      } else {
        throw new HttpException(
          'Unauthorized user, incorrect password.',
          HttpStatus.UNAUTHORIZED,
        );
      }
    } else {
      throw new HttpException(
        `User with email ${loginUserDto.email} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
