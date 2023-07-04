import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { NOT_FOUND_TOP_PAGE_ERROR } from './top-page.constants';
import { TopPageService } from './top-page.service';


@Controller('top-page')
export class TopPageController {

    constructor(private readonly topPageService: TopPageService) {}

    @UseGuards(JwtAuthGuard) //как определить какие методы мы защищаем?
    @Post('create')
    async create(@Body() dto: CreateTopPageDto) {
        return this.topPageService.create(dto)
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async get(@Param('id', IdValidationPipe) id: string) {
        const page = await this.topPageService.findById(id)
        if(!page) {
            throw new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR)
        }
        return page;
    }

    @Get('byAlias/:alias')
    async getbyAlias(@Param('alias') alias: string) {
        const page = await this.topPageService.findByAlias(alias)
        if(!page) {
            throw new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR)
        }
        return page;
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id', IdValidationPipe) id: string) {
        const deletedPage = await this.topPageService.deleteById(id)
        if(!deletedPage) {
            throw new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR)
        }
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async patch(@Param('id', IdValidationPipe) id: string, @Body() dto: CreateTopPageDto) {
        const updatedPage = await this.topPageService.updateById(id, dto)
        if(!updatedPage) {
            throw new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR)
        }
        return updatedPage;
    }

    //этот find нужен чтобы формировать меню, с точки зрения данных вся модель не нужна
    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post('find')
    async find(@Body() dto: FindTopPageDto) {
        return this.topPageService.findByCategory(dto.firstCategory);
    }

    //всегда ли нужно отдельно делать поиск по тексту?
    @Get('textSearch/:text')
    async textSearch(@Param('text') text: string) {
        return this.topPageService.findByText(text);
    }
}
