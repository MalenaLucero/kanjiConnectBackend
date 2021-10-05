import { IsNumber, IsString, IsNotEmpty, IsArray, IsPositive, IsOptional, Min, Max, IsMongoId } from "class-validator";
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
}

export class UpdateUserKanjiDto extends PartialType(
    OmitType(CreateUserKanjiDto, ['expressions'])
){}