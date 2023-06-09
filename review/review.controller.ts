import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ReviewModel } from './review.model/review.model'

@Controller('review')
export class ReviewController {

    @Post('create')
    async create(@Body() dto: Omit<ReviewModel, '_id'>) { //за исключением айди

    }
    
    @Delete(':id')
    async delete(@Param('id') id: string) {

    }

    @Get('byProduct/:productId')
    async getbyProduct(@Param('productId') productId: string) {

    }
}
