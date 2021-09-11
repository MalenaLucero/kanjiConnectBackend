import { IsString, IsNotEmpty, IsArray, IsOptional } from "class-validator";
import { OmitType, PartialType } from "@nestjs/swagger";
import { Type } from 'class-transformer';

import { CreateTagDto } from '../dtos/tag.dto'

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    readonly username: string;

    @IsArray()
    @IsOptional()
    @Type(() => CreateTagDto)
    readonly tags: CreateTagDto[];
}

export class UpdateUserDto extends PartialType(
    OmitType(CreateUserDto, ['tags'])
){}