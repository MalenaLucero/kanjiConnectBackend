import { IsNumber, IsString, IsNotEmpty, IsArray, IsPositive, IsOptional, Min, Max, IsMongoId, IsDate } from "class-validator";
import { PartialType, OmitType } from "@nestjs/swagger";
import { Type } from 'class-transformer';

import { CreateExampleSentenceDto } from "./example-sentence.dto";
import { difficultyLevels } from "src/common/difficulty-levels";
import { jlptLevels } from "src/common/jlpt-levels";

export class CreateExpressionDto {
    @IsString()
    @IsNotEmpty()
    readonly word: string;

    @IsString()
    @IsOptional()
    readonly reading: string;

    @IsArray()
    @IsOptional()
    readonly englishMeaning: Array<string>;

    @IsArray()
    @IsOptional()
    readonly japaneseMeaning: Array<string>;

    @IsNumber()
    @IsOptional()
    @Min(jlptLevels.min)
    @Max(jlptLevels.max)
    readonly jlpt: number;

    @IsString()
    @IsOptional()
    readonly transitivity: string;

    @IsArray()
    @IsOptional()
    @Type(() => CreateExampleSentenceDto)
    readonly exampleSentences: CreateExampleSentenceDto[];

    @IsArray()
    @IsOptional()
    readonly tags: Array<string>;

    @IsMongoId()
    @IsNotEmpty()
    readonly lesson: string;

    @IsMongoId()
    @IsNotEmpty()
    readonly user: string;

    @IsArray()
    @IsNotEmpty()
    kanjis: string[];

    @IsNumber()
    @IsOptional()
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

export class UpdateExpressionDto extends PartialType(
    OmitType(CreateExpressionDto, ['kanjis', 'exampleSentences', 'tags'])
){}

export class FilterExpressionsDto {
    @IsMongoId()
    @IsNotEmpty()
    user: string;

    @IsOptional()
    @IsPositive()
    limit: number;

    @IsOptional()
    @Min(0)
    offset: number;

    @IsOptional()
    @IsString()
    lesson: string;

    @IsOptional()
    @IsArray()
    tags: Array<string>;

    @IsOptional()
    @IsArray()
    kanjis: Array<string>;

    @IsOptional()
    @IsNumber()
    @Min(difficultyLevels.min)
    @Max(difficultyLevels.max)
    difficulty: number;

    @IsString()
    @IsOptional()
    source: string;

    @IsString()
    @IsOptional()
    transitivity: string;

    @IsNumber()
    @IsOptional()
    @Min(jlptLevels.min)
    @Max(jlptLevels.max)
    jlpt: number;
}