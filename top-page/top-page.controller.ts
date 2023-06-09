import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { TopPageModel } from './top-page.model/top-page.model';
import { ConfigService } from '@nestjs/config'


@Controller('top-page')
export class TopPageController {

    constructor(private readonly configService: ConfigService) {}

    @Post('find')
    async create(@Body() dto: Omit<TopPageModel, '_id'>) { //за исключением айди

    }

    @Get('get/:alias')
    async get(@Param('id') id: string) {
        this.configService.get('TEST')

    }

    @Delete(':id')
    async delete(@Param('id') id: string) {

    }

    @Patch(':id')
    async patch(@Param('id') id: string, @Body() dto: TopPageModel) {

    }

    @HttpCode(200)
    @Post()
    async find(@Body() dto: FindTopPageDto) {

    }
}
