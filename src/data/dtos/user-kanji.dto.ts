import { IsNumber, IsString, IsNotEmpty, IsArray, IsPositive, IsOptional, Min, Max, IsMongoId, IsDate } from "class-validator";
import { PartialType, OmitType } from "@nestjs/swagger";
import { Type } from 'class-transformer';

import { CreateExampleSentenceDto } from "./example-sentence.dto";

export class CreateUserKanjiDto {
    @IsMongoId()
    @IsNotEmpty()
    readonly user: string;

    @IsMongoId()
    @IsNotEmpty()
    readonly kanji: string;

    @IsArray()
    @IsNotEmpty()
    readonly expressions: Array<string>;

    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    @Max(5)
    difficulty: number;

    @IsDate()
    @IsNotEmpty()
    created: Date;

    @IsDate()
    @IsNotEmpty()
    updated: Date;
}

export class UpdateUserKanjiDto extends PartialType(
    OmitType(CreateUserKanjiDto, ['expressions'])
){}

export class FilterUserKanjiDto {
    @IsMongoId()
    @IsNotEmpty()
    user;

    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(5)
    difficulty;

    @IsMongoId()
    @IsOptional()
    lesson;

    @IsArray()
    @IsOptional()
    tags;

    @IsNumber()
    @IsOptional()
    jlpt;
}