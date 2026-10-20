import { Transform } from "class-transformer";
import { MaxLength } from "class-validator";
import { IsNotEmpty, Length } from "class-validator";
import { IsString } from "class-validator";

export class CreateCategoryDto {
  @Transform(({value}) => typeof value === 'string' ? value.trim() : value)
  @IsString()
  @IsNotEmpty()
  @Length(1,100)
  name: string;
}
