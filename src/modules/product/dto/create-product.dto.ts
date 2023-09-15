import { ApiProperty } from "@nestjs/swagger";
import { Allow, IsEmpty, Length } from "class-validator";

export class CreateProductDto {
  @ApiProperty()
  @Length(3,20)
  name: string;

  @ApiProperty()
  @Allow()
  des?: string;
}
