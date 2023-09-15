import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, Length } from "class-validator";

export class CreateUserDto {
    @ApiProperty()
    @Length(3, 20)
    name: string;

    @ApiProperty()
    @IsEmail()
    email: string;
}
