import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/registerUser.dto';
import { ERole } from 'src/utils/enum/ERole.enum';
import * as bcrypt from 'bcrypt';
import { IUserDetail } from './interface/userDetail.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(
    registerUserDto: RegisterUserDto,
    isUser: boolean,
  ): Promise<User> {
    const { name, email, password, confirmPassword } = registerUserDto;

    if (password !== confirmPassword)
      throw new BadRequestException('Passwords do not match');

    const hashedPassword = await bcrypt.hash(password, 10);

    const role: ERole = isUser ? ERole.USER : ERole.ADMIN;

    const user: User = await this.userRepository.save({
      name,
      email,
      password: hashedPassword,
      role,
    });

    if (!user) throw new BadRequestException('Could not create user');

    return user;
  }

  async findAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findUserById(id: string): Promise<IUserDetail> {
    const user: User = await this.userRepository.findOneBy({ id });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      tickets: user.tickets,
    };
  }
}
