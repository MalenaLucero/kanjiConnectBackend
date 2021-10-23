import { IsNotEmpty, IsUrl, IsString } from "class-validator";
import { PartialType } from "@nestjs/swagger";

export class CreateSourceDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsUrl()
    readonly link: string;
}

export class UpdateSourceDto extends PartialType(CreateSourceDto){}