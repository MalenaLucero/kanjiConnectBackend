import { IsString, IsNotEmpty, IsDate, IsUrl } from "class-validator";
import { PartialType } from "@nestjs/swagger";

export class CreateLessonDto {
    @IsDate()
    @IsNotEmpty()
    readonly date: Date;

    @IsString()
    readonly topic: string;

    @IsUrl()
    readonly link: string;
}

export class UpdateLessonDto extends PartialType(CreateLessonDto){}