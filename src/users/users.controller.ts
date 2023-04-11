import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateUserDto} from "./dto/create-user.dto";
import {UsersService} from "./users.service";
import {User} from "./users.model";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}
    @ApiOperation({ summary: "Create user" })
    @ApiResponse({ status: 200, type: User })
    @Post()
    create(@Body() userDto: CreateUserDto) {
       return this.userService.createUser(userDto)
    }
    @ApiOperation({ summary: "Get users" })
    @ApiResponse({ status: 200, type: [User] })
    @UseGuards(JwtAuthGuard)
    @Get()
    getAllUsers() {
        return this.userService.getAllUsers()
    }
}
