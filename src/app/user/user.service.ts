import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/registerUser.dto';
import { ERole } from 'src/utils/enum/ERole.enum';
import * as bcrypt from 'bcrypt';
import { IUserDetail } from './interface/userDetail.interface';
import LoginDto from '../auth/dto/login.dto';
import { IJwtPayload } from '../auth/interface/jwtPayload.interface';
import { TimezoneService } from '../timezone/timezone.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private timezoneService: TimezoneService,
  ) {}

  async createUser(
    registerUserDto: RegisterUserDto,
    isUser: boolean,
  ): Promise<User> {
    const { name, email, password, confirmPassword } = registerUserDto;

    const createdAt: string = this.timezoneService.getTimeZone();
    const updatedAt: string = createdAt;

    if (password !== confirmPassword)
      throw new BadRequestException('Passwords do not match');

    const hashedPassword: string = await bcrypt.hash(password, 10);

    const role: ERole = isUser ? ERole.USER : ERole.ADMIN;

    const user: User = await this.userRepository.save({
      name,
      email,
      password: hashedPassword,
      role,
      createdAt,
      updatedAt,
    });

    if (!user) throw new BadRequestException('Could not create user');

    return user;
  }

  async findAllUsers(): Promise<User[]> {
    return this.userRepository.find({
      where: { role: ERole.USER },
    });
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

  async validateCredentials(loginDto: LoginDto): Promise<IJwtPayload> {
    const { email, password } = loginDto;

    const user: User = await this.userRepository.findOneBy({ email });

    if (!user)
      throw new BadRequestException(
        'Invalid credentials, email or password wrong',
      );

    const isPasswordValid: boolean = await bcrypt.compare(
      password,
      user.password,
    );

    if (!isPasswordValid)
      throw new BadRequestException(
        'Invalid credentials, email or password wrong',
      );

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }
}
