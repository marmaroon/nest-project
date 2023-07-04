import { Type } from "class-transformer";
import { IsNumber, IsString, IsOptional, IsArray, ValidateNested, IsNotEmpty, IsEnum} from "class-validator";
import {TopLevelCategory} from '../top-page.model'

    
    export class HhDataDto {
        
        @IsNumber()
        count: number;
    
        @IsNumber()
        juniorSalary: number;
    
        @IsNumber()
        middleSalary: number;
    
        @IsNumber()
        seniorSalary: number;
    }
    
    export class TopPageAdvantageDto {
        
        @IsString()
        title: string;
    
        @IsString()
        description: string
    }
    
    export class CreateTopPageDto {
    
        @IsEnum(TopLevelCategory)
        firstCategory: TopLevelCategory;

        @IsString()
        secondCategory: string;

        @IsString()
        alias: string
    
        @IsString()
        title: string;
    
        @IsString()
        category: string;
    
        @IsOptional()
        @ValidateNested() //обрабатывает вложенные свойства объекта и применяет определенные правила валидации к каждому из них
        @Type(() => HhDataDto)
        hh?: HhDataDto
    
        @IsArray()
        @ValidateNested()
        @Type(() => TopPageAdvantageDto)
        advantages: TopPageAdvantageDto[];
    
        @IsString()
        seoText: string;
    
        @IsString()
        tagsTitle: string;
    
        @IsArray()
        @IsString({ each: true})
        tags: string[]
    
    }
    