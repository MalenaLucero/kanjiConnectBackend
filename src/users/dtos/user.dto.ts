import { IsString, IsNotEmpty, IsArray, IsOptional, IsEmail } from "class-validator";
import { OmitType, PartialType } from "@nestjs/swagger";
import { Type } from 'class-transformer';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    readonly username: string;

    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    readonly password: string;

    @IsString()
    @IsNotEmpty()
    readonly role: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto){}