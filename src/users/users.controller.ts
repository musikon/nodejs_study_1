import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateUserDto, UpdateUserDto} from "./dto/create-user.dto";
import {UsersService} from "./users.service";
import {User} from "./users.model";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {AddRoleDto} from "./dto/add-role.dto";
import {ValidationPipe} from "../pipes/validation.pipe";

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}
    @ApiOperation({ summary: "Create user" })
    @ApiResponse({ status: 200, type: User })
    @UsePipes(ValidationPipe)
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
    @ApiOperation({ summary: "Delete user" })
    @Delete(':id')
    @Roles('Admin')
    @UseGuards(RolesGuard)
    deleteUser(@Param('id') id: string) {
        return this.userService.deleteUserById(Number(id))
    }

    @ApiOperation({summary: 'Give role'})
    @ApiResponse({status: 200})
    @Roles("Admin")
    @UseGuards(RolesGuard)
    @Post('/role')
    addRole(@Body() dto: AddRoleDto) {
        return this.userService.addRole(dto);
    }
}
