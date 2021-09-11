import { IsNotEmpty, IsDate, IsUrl } from "class-validator";
import { PartialType } from "@nestjs/swagger";

export class CreateClassDto {
    @IsDate()
    @IsNotEmpty()
    readonly date: Date;
    
    @IsUrl()
    @IsNotEmpty()
    readonly link: string;
}

//con partial type los campos son opcionales
export class UpdateClassDto extends PartialType(CreateClassDto){}