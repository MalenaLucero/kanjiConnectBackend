import { IsNotEmpty, IsArray, IsOptional, IsMongoId } from "class-validator";
import { PartialType, OmitType } from "@nestjs/swagger";
import { Type } from 'class-transformer';

import { CreateTagDto } from "./tag.dto";
import { CreateLessonDto } from "./lesson.dto";

export class CreateFilterDto {
    @IsMongoId()
    @IsNotEmpty()
    readonly user: string;

    @IsArray()
    @IsOptional()
    @Type(() => CreateTagDto)
    readonly tags: CreateTagDto[];

    @IsArray()
    @IsOptional()
    @Type(() => CreateLessonDto)
    readonly lessons: CreateLessonDto[];
}

export class UpdateFilterDto extends PartialType(
    OmitType(CreateFilterDto, ['tags', 'lessons'])
){}