import { IsInt, IsOptional, IsString, Length, Max } from "class-validator";
import { Transform, Type } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { IsNumber, Min } from "class-validator";

export class CreateProductDto {

@Transform(({value}) => typeof value === 'string' ? value.trim() : value)
@IsNotEmpty()
@IsString()
@Length(1,100)  
name: string;

@Type(() => Number)
@IsNumber({maxDecimalPlaces: 2}, {message: 'Price must be a number with up to 2 decimal places'})
@IsNotEmpty()
@Min(0)
@Max(99999999.99, {message: 'Price must not exceed 99999999.99'})
price: number;

@Transform(({value}) => typeof value === 'string' ? value.trim() : value)
@IsString()
@Length(0,10000)
@IsOptional()
description?: string | null;

@Type(() => Number)
@IsInt()
@Min(0)
quantity: number;

@Type(() => Number)
@IsInt()
@IsNotEmpty()
@Min(1)
categoryId: number;





}
