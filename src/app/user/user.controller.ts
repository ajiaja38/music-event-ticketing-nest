import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import { User } from './entity/user.entity';
import { IUserDetail } from './interface/userDetail.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  registerUserHandler(@Body() registerUserDto: RegisterUserDto): Promise<User> {
    return this.userService.createUser(registerUserDto, false);
  }

  @Get()
  getAllUsersHandler(): Promise<User[]> {
    return this.userService.findAllUsers();
  }

  @Get(':id')
  getUserByIdHandler(@Param('id') id: string): Promise<IUserDetail> {
    return this.userService.findUserById(id);
  }
}
