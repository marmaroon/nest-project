import { Body, Controller, Delete, Get, Param, Post, HttpException, HttpStatus, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewService } from './review.service';
import { REVIEW_NOT_FOUND } from './review.constants';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UserEmail } from '../decorators/user-email.decorator';

@Controller('review')
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) {}

    @UsePipes( new ValidationPipe)
    @Post('create')
    async create(@Body() dto: CreateReviewDto) {
        return this.reviewService.create(dto)
    }
    
    @Delete(':id')
    async delete(@Param('id') id: string) {
        const deletedDoc = await this.reviewService.delete(id);
        if(!deletedDoc) {
            throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND)
        }
    }

    @UseGuards(JwtAuthGuard) //только авторизованные пользователи
    @Get('byProduct/:productId')
    async getbyProduct(@Param('productId') productId: string, @UserEmail() email: string) {
        console.log(email);
        
        return this.reviewService.findByProductId(productId)
    }
}
