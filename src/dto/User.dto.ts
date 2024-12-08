import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserDTO {
    @IsNotEmpty()
    @IsString()
    username!: string;

    @IsEmail()
    @IsNotEmpty()
    @IsString()
    email!: string;

    @IsNotEmpty()
    @IsString()
    password!: string;
}

export class UpdateUserDTO {
    @IsOptional()
    @IsString()
    username!: string;
}

export class LoginUserDTO {
    @IsNotEmpty()
    @IsEmail()
    @IsString()
    email!: string;

    @IsNotEmpty()
    @IsString()
    password!: string;
}