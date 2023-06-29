import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { Types } from "mongoose";
import { ID_VALIDATION_ERROR } from "./id-validation.constants";

// если у нас айдишник продукта, например, не будет совпадать с монговским, чтобы не было 500 ошибки мы валидируем с помощью пайпа
@Injectable()
export class IdValidationPipe implements PipeTransform {
    transform(value: string, metadata: ArgumentMetadata) {
        if (metadata.type != 'param') {
            return value;
        }
        if (!Types.ObjectId.isValid(value)) {
            throw new BadRequestException(ID_VALIDATION_ERROR);
        }
        return value;
    }
}