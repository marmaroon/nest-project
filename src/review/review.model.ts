import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';
import { prop } from '@typegoose/typegoose'
import { Types } from 'mongoose'

export interface ReviewModel extends Base {} //базового класса для моделей данных, общая функциональность для моделей(создание и обновление записей в бд)
export class ReviewModel extends TimeStamps{ // функциональность для автоматической установки временных меток 
    //(например, даты создания и обновления) при сохранении объектов в базе данных
    
    @prop() //из библиотеки монгуза, говорим, что свойство должно быть сохранено в бд
    name: string;

    @prop()
    title: string;

    @prop()
    description: string;

    @prop()
    rating: number;

    @prop({ type: Types.ObjectId })
    productId: Types.ObjectId; //  встроенный тип из Mongoose для представления идентификаторов объектов
}
