import { BadRequestException, Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Status } from 'tslint/lib/runner';
import { AuthService } from './auth.service';
import { ALREADY_REGISTERED_ERROR } from './dto/auth.constants';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UsePipes(new ValidationPipe())
    @Post('register')
    async register(@Body() dto: AuthDto) {
        const oldUser = await this.authService.findUser(dto.login);
        if (oldUser) {
            throw new BadRequestException(ALREADY_REGISTERED_ERROR);
        }
        return this.authService.createUser(dto)
    }

    @HttpCode(200)
    @Post('register')
    async login(@Body() dto: AuthDto) {

    }
}