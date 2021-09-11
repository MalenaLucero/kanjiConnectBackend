import { IsString, IsNotEmpty, IsOptional, IsPositive, Min, ValidateIf } from "class-validator";
import { ApiProperty, PartialType } from "@nestjs/swagger";

export class CreateTagDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({description:'name of tag'})
    readonly name: string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly type: string;
}

export class UpdateTagDto extends PartialType(CreateTagDto){}

export class FilterTagsDto {
    @IsOptional()
    @IsPositive()
    limit: number;

    @IsOptional()
    @Min(0)
    offset: number;

    @IsOptional()
    @Min(0)
    minPrice: number;

    @ValidateIf((params) => params.minPrice)
    @IsOptional()
    @IsPositive()
    maxPrice: number;
}