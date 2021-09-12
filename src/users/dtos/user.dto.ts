import { IsString, IsNotEmpty, IsArray, IsOptional } from "class-validator";
import { OmitType, PartialType } from "@nestjs/swagger";
import { Type } from 'class-transformer';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    readonly username: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto){}