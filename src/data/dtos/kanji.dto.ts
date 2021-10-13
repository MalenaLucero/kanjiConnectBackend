import { IsNumber, IsString, IsNotEmpty, IsArray, IsPositive, IsOptional, Min, Max } from "class-validator";
import { PartialType } from "@nestjs/swagger";

import { jlptLevels } from "src/common/jlpt-levels";
import { gradeLevels } from "src/common/grade-levels";

export class CreateKanjiDto {
    @IsString()
    @IsNotEmpty()
    readonly kanji: string;

    @IsNumber()
    @Min(jlptLevels.min)
    @Max(jlptLevels.max)
    readonly jlpt: number;

    @IsNumber()
    @Min(gradeLevels.min)
    @Max(gradeLevels.max)
    readonly grade: number;

    @IsArray()
    readonly meanings: Array<string>;

    @IsArray()
    readonly kun_readings: Array<string>;

    @IsArray()
    readonly on_readings: Array<string>;
}

export class UpdateKanjiDto extends PartialType(CreateKanjiDto){}

export class FilterKanjisDto {
    @IsOptional()
    @IsPositive()
    limit: number;

    @IsOptional()
    @Min(0)
    offset: number;

    @IsOptional()
    @IsString()
    kanji: string;

    @IsOptional()
    @IsNumber()
    @Min(jlptLevels.min)
    @Max(jlptLevels.max)
    jlpt: number;
}