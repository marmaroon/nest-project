import { Injectable } from '@nestjs/common';
import { ReviewModel } from './review.model/review.model';
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types';
import { CreateReviewDto } from './dto/create-review.dto';
import { Types } from 'mongoose'
import { InjectModel } from 'nestjs-typegoose';


//Декоратор @Inject для внедрения зависимости в класс
//он указывает, что нужно внедрить экземпляр класса ReviewModel в параметр конструктора reviewModel класса ReviewService.
//В итоге, при создании экземпляра класса ReviewService, автоматически внедрится экземпляр ReviewModel 
// в параметр конструктора reviewModel, что позволит классу ReviewService взаимодействовать с базой данных через модель ReviewModel. 
@Injectable()
export class ReviewService {
    constructor(@InjectModel(ReviewModel) private readonly reviewModel: ModelType<ReviewModel>) { }

    async create(dto: CreateReviewDto): Promise<DocumentType<ReviewModel>> {
        return this.reviewModel.create(dto);
    }

    async delete(id: string): Promise<DocumentType<ReviewModel> | null> {
        return this.reviewModel.findByIdAndDelete(id).exec()
    }

    async findByProductId(productId: string): Promise<DocumentType<ReviewModel>[]> {
        return this.reviewModel.find({ productId: Types.ObjectId(productId)}).exec()
    }

    async deleteByProductId(productId: string) {
        return this.reviewModel.deleteMany({productId: Types.ObjectId(productId)}).exec()
    }

}
