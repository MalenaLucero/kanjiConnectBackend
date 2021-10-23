import { IsString, IsNotEmpty, IsDate, IsUrl, IsOptional, IsMongoId, IsArray } from "class-validator";
import { PartialType } from "@nestjs/swagger";
import { Type } from 'class-transformer';
import { CreateSourceDto } from "./source.dto";

export class CreateLessonDto {
    @IsMongoId()
    @IsNotEmpty()
    readonly user: string;
    
    @IsDate()
    @IsNotEmpty()
    readonly date: Date;

    @IsString()
    readonly topic: string;

    @IsUrl()
    readonly link: string;

    @IsArray()
    @IsOptional()
    @Type(() => CreateSourceDto)
    readonly lessons: CreateSourceDto[];
}

export class UpdateLessonDto extends PartialType(CreateLessonDto){}

export class FilterLessonDto {
    @IsOptional()
    @IsMongoId()
    filter: string;

    @IsOptional()
    @IsMongoId()
    user: string;
}