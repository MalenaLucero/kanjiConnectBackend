import { IsNumber, IsString, IsNotEmpty, IsArray, IsPositive, IsOptional, Min, Max, IsMongoId } from "class-validator";
import { PartialType, OmitType } from "@nestjs/swagger";
import { Type } from 'class-transformer';

import { CreateExampleSentenceDto } from "./example-sentence.dto";

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

    @IsArray()
    @IsOptional()
    @Type(() => CreateExampleSentenceDto)
    readonly exampleSentences: CreateExampleSentenceDto[];

    @IsArray()
    @IsOptional()
    readonly tags_id: Array<string>;

    @IsMongoId()
    @IsNotEmpty()
    readonly user: string;

    @IsArray()
    @IsNotEmpty()
    readonly kanjis: string[];
}

export class UpdateExpressionDto extends PartialType(
    OmitType(CreateExpressionDto, ['kanjis', 'exampleSentences'])
){}

export class FilterExpressionsDto {
    @IsOptional()
    @IsPositive()
    limit: number;

    @IsOptional()
    @Min(0)
    offset: number;
}