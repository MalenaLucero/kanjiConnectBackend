import { IsString, IsNotEmpty, IsOptional, IsUrl } from "class-validator";
import { PartialType } from "@nestjs/swagger";

export class CreateExampleSentenceDto {
    @IsString()
    @IsNotEmpty()
    readonly sentence: string;
    
    @IsString()
    @IsOptional()
    readonly source: string;

    @IsUrl()
    @IsOptional()
    readonly link: string;
}

export class UpdateExampleSentenceDto extends PartialType(CreateExampleSentenceDto){}