import { IsString, IsNotEmpty, IsUrl, IsMongoId } from "class-validator";
import { PartialType } from "@nestjs/swagger";

export class CreateLessonSourceDto {
    @IsMongoId()
    @IsNotEmpty()
    readonly user: string;

    @IsMongoId()
    @IsNotEmpty()
    readonly lesson: string;

    @IsMongoId()
    @IsNotEmpty()
    readonly source: string;

    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsUrl()
    readonly link: string;
}

export class UpdateLessonSourceDto extends PartialType(CreateLessonSourceDto){}