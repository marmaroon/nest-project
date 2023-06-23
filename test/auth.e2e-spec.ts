import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Types, disconnect } from 'mongoose';
import { REVIEW_NOT_FOUND } from '../src/review/review.constants';
import { AuthDto } from 'src/auth/dto/auth.dto';

const productId = new Types.ObjectId().toHexString()
const loginDto: AuthDto = {
  login: 'example@example.com',
  password: 'password123'
}

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let createdId: string;
  let token: string


  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/review/create (POST) — Should return access token', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDto)
      .expect(200);
    expect(response.body.access_token).toBeDefined();
  });

  it('/review/create (POST) — Should return password error', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ ...loginDto, password: "qwerty" })
      .expect(401, {
        statusCode: 401,
        message: "Неверный логин или пароль",
        error: "Unauthorized"
      });
  });

  it('/review/create (POST) — Should return password error', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ ...loginDto, login: 'QQQ@q.ru' })
      .expect(401, {
        statusCode: 401,
        message: "Неверный логин или пароль",
        error: "Unauthorized"
      });
  });





    afterAll(() => {
      disconnect()
  })
})
