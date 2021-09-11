import { IsString, IsNotEmpty } from "class-validator";
import { PartialType } from "@nestjs/swagger";

export class CreateTagDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;
    
    @IsString()
    readonly description: string;
}

export class UpdateTagDto extends PartialType(CreateTagDto){}