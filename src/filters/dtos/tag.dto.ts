import { IsString, IsNotEmpty, IsMongoId, IsOptional } from "class-validator";
import { PartialType } from "@nestjs/swagger";

export class CreateTagDto {
    @IsMongoId()
    @IsNotEmpty()
    readonly user: string;
    
    @IsString()
    @IsNotEmpty()
    readonly name: string;
    
    @IsString()
    readonly description: string;
}

export class UpdateTagDto extends PartialType(CreateTagDto){}

export class FilterTagDto {
    @IsOptional()
    @IsMongoId()
    filter: string;

    @IsOptional()
    @IsMongoId()
    user: string;
}