import { IsString, IsNotEmpty, IsDate, IsUrl, IsOptional, IsMongoId } from "class-validator";
import { PartialType } from "@nestjs/swagger";

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