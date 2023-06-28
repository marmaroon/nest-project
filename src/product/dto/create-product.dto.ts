import { Type } from "class-transformer";
import { IsNumber, IsString, IsOptional, IsArray, ValidateNested} from "class-validator";

class ProductCharacteristicDto {
    @IsString()
    name: string;

    @IsString()
    value: string
}
export class CreateProductDto {
    @IsString()
    image: string;

    @IsString()
    title: string;

    @IsNumber()
    price: number;

    @IsOptional()
    @IsNumber()
    oldPrice?: number;

    @IsNumber()
    credit: number;

    @IsString()
    description: string;

    @IsString()
    advantages: string;

    @IsString()
    disadvantages: string;

    @IsString({ each: true} ) //проверка каждого
    categories: string[];

    @IsString({ each: true} )
    tags: string[];

    @IsArray()
    @ValidateNested() //зайти в этот объект и провалидировать его тоже
    @Type(() => ProductCharacteristicDto)
    characteristics: ProductCharacteristicDto[]
}