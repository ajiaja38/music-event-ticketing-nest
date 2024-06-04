import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import { User } from './entity/user.entity';
import { IUserDetail } from './interface/userDetail.interface';
import { JwtAuthGuard } from 'src/guards/Jwt-Auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/Roles.decorator';
import { ERole } from 'src/utils/enum/ERole.enum';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  registerUserHandler(@Body() registerUserDto: RegisterUserDto): Promise<User> {
    return this.userService.createUser(registerUserDto, true);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(ERole.ADMIN)
  getAllUsersHandler(): Promise<User[]> {
    return this.userService.findAllUsers();
  }

  @Get(':id')
  getUserByIdHandler(@Param('id') id: string): Promise<IUserDetail> {
    return this.userService.findUserById(id);
  }
}
