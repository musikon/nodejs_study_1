import {Body, Controller, Post, UsePipes} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {AuthService} from "./auth.service";
import {ValidationPipe} from "../pipes/validation.pipe";

@ApiTags("Auth")
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {
    }
    @Post('/login')
    login(@Body() userDto: CreateUserDto) {
        return this.authService.login(userDto)
    }

    @UsePipes(ValidationPipe)
    @Post('/registration')
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto)
    }
}
