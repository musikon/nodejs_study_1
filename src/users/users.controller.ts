import {Body, Controller, Get, Post, Put} from '@nestjs/common';
import {UsersService} from "./users.service";
import {CreateUserDto, UpdateUserDto} from "./dto/create-user.dto";

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.usersService.create(userDto);
    }

    @Get()
    getAll() {
        return this.usersService.getAll();
    }
}
