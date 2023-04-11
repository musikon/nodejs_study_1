import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({ example: "example@mail.ru" })
    readonly email: string;

    @ApiProperty({ example: "1234" })
    readonly password: string;
}

export class UpdateUserDto {
    readonly email: string;
    readonly password: string;
    readonly age: string;
}