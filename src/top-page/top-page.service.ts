import { Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { TopLevelCategory, TopPageModel } from './top-page.model';

@Injectable()
export class TopPageService {
    constructor(@InjectModel(TopPageModel) private readonly topPageModel: ModelType<TopPageModel>) { }

    async create(dto: CreateTopPageDto) {
        return this.topPageModel.create(dto)
    }

    async findById(id: string) {
        return this.topPageModel.findById(id).exec() //можно ли не разделять методы по поиску айди, категории и тд
    }

    async findByAlias(alias: string) {
        return this.topPageModel.findOne({alias}).exec()
    }

    async findByCategory(firstCategory: TopLevelCategory) {
        return this.topPageModel.aggregate([
        {
            $match:{
                firstCategory
            }
        },
        {
            $group: {
                _id: { secondCaregory: '$secondCategory'},
                pages: { $push: { alias: '$alias', title: '$title'}}
            }
        }
    ])
    .exec() //возвращаем только часть модели и вложенный массив с категориями
    }

    async findByText(text: string) {
        return this.topPageModel.find({ $text: { $search: text } }).exec();
      }     

    async deleteById(id: string) {
        return this.topPageModel.findByIdAndDelete(id).exec()
    }

    async updateById(id: string, dto: CreateTopPageDto) {
        return this.topPageModel.findByIdAndUpdate(id, dto, {new: true}).exec()
    }

}