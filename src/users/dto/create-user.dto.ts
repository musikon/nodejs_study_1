export class CreateUserDto {
    readonly login: string;
    readonly password: string;
}

export class UpdateUserDto {
    readonly login: string;
    readonly password: string;
    readonly age: string;
}