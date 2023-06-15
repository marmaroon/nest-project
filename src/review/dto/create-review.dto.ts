import {IsString, IsNumber, Max, Min} from 'class-validator'

export class CreateReviewDto {
    @IsString()
    name: string;

    @IsString()
    title: string;

    @IsString()
    description: string;

    @Max(5)
    @Min(1)
    @IsNumber()
    rating: number;

    @IsString()
    productId: string
    typegooseName: string; // Добавлено поле typegooseName
    createdAt?: Date; // Добавлено поле createdAt с возможностью быть необязательным
    updatedAt?: Date; // Добавлено поле updatedAt с возможностью быть необязательным
    __t?: string | number; // Добавлено поле __t с возможностью быть необязательным
}