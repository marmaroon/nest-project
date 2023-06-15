export class CreateReviewDto {
    name: string;
    title: string;
    description: string;
    rating: number;
    productId: string
    typegooseName: string; // Добавлено поле typegooseName
    createdAt?: Date; // Добавлено поле createdAt с возможностью быть необязательным
    updatedAt?: Date; // Добавлено поле updatedAt с возможностью быть необязательным
    __t?: string | number; // Добавлено поле __t с возможностью быть необязательным
}