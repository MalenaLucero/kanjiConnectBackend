import { IsNumber, IsString, IsNotEmpty, IsArray, IsPositive, IsOptional, Min, Max, IsMongoId, IsDate, MinLength } from "class-validator";
import { PartialType, OmitType } from "@nestjs/swagger";
import { Type } from 'class-transformer';

import { CreateExampleSentenceDto } from "./example-sentence.dto";
import { difficultyLevels } from "src/common/difficulty-levels";
import { jlptLevels } from "src/common/jlpt-levels";

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
    @Min(difficultyLevels.min)
    @Max(difficultyLevels.max)
    difficulty: number;

    @IsDate()
    @IsNotEmpty()
    created: Date;

    @IsDate()
    @IsNotEmpty()
    updated: Date;

    @IsString()
    @IsOptional()
    readonly notes: string;
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
    @Min(difficultyLevels.min)
    @Max(difficultyLevels.max)
    difficulty;

    @IsMongoId()
    @IsOptional()
    lesson;

    @IsArray()
    @IsOptional()
    tags;

    @IsNumber()
    @IsOptional()
    @Min(jlptLevels.min)
    @Max(jlptLevels.max)
    jlpt;

    @IsString()
    @IsOptional()
    @MinLength(1)
    kanjiAsCharacter;

    @IsMongoId()
    @IsOptional()
    source;

    @IsArray()
    @IsOptional()
    kanjiList;
}