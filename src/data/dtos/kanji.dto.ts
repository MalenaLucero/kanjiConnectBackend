import { IsNumber, IsString, IsNotEmpty, IsArray, IsPositive, IsOptional, Min, Max } from "class-validator";
import { PartialType } from "@nestjs/swagger";

export class CreateKanjiDto {
    @IsString()
    @IsNotEmpty()
    readonly kanji: string;

    @IsNumber()
    @IsPositive()
    @Min(1)
    @Max(4)
    readonly jlpt: number;

    @IsNumber()
    @IsPositive()
    @Min(1)
    @Max(8)
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
}