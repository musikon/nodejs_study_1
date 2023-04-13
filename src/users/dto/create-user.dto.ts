import {ApiProperty} from "@nestjs/swagger";
import { IsString, Length, IsEmail} from "class-validator";

export class CreateUserDto {
    @ApiProperty({ example: "example@mail.ru" })
    @IsString({message: "Should be string"})
    @IsEmail({}, {message: "Email incorrect"})
    readonly email: string;

    @ApiProperty({ example: "1234" })
    @IsString({message: "Should be string"})

    @Length(6, 16, { message: "for 6 to 16" })
    readonly password: string;
}


export class UpdateUserDto {
    readonly email: string;
    readonly password: string;
    readonly age: string;
}