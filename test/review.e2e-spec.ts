import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateReviewDto } from '../src/review/dto/create-review.dto';
import { Types, disconnect } from 'mongoose';
import { REVIEW_NOT_FOUND } from '../src/review/review.constants';
import { AuthDto } from 'src/auth/dto/auth.dto';

const productId = new Types.ObjectId().toHexString()
const loginDto: AuthDto = {
  login: 'example@example.com',
  password: 'password123'
}

const testDto: CreateReviewDto = {
  name: 'Test',
  title: 'Title',
  description: 'Description',
  rating: 5,
  productId,
  typegooseName: ''
};


describe('AppController (e2e)', () => {
  let app: INestApplication;
  let createdId: string;
  let token: string


  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const { body } = await request(app.getHttpServer())
    .post('/auth/login')
    .send(loginDto)
    token = body.access_token;
  });

  it('/review/create (POST) — Should create a review with dto there', async () => {
    const response = await request(app.getHttpServer())
      .post('/review/create')
      .send(testDto)
      .expect(201);
      
    
    createdId = response.body._id;
    expect(createdId).toBeDefined();
  });

  it(`/review/create (POST) — Should return error 400 'rating must not be less than 1'`, async () => {
    const response = await request(app.getHttpServer())
      .post('/review/create')
      .send({...testDto, rating: 0})
      .expect(400);
  });

  it('/review/byProduct/:productId (GET) — Should return reviews by productId', async () => {
    const response = await request(app.getHttpServer())
      .get('/review/byProduct/' + productId)
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
      const body = response.body
      expect(body.length).toBe(1)
  });

  it('/review/byProduct/:productId (GET) - Should return empty array for invalid productId', async () => {
    const response = await request(app.getHttpServer())
      .get('/review/byProduct/' + new Types.ObjectId().toHexString())
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
      const body = response.body
      expect(body.length).toBe(0)
  });

  it('/review/:id (DELETE) - Should delete review' , () => {
    return request(app.getHttpServer())
      .delete('/review/' +  createdId)
      .set('Authorization', 'Bearer ' + token)
      .expect(200);
  });

  it('/review/:id (DELETE) - Should return delete error' , () => {
    return request(app.getHttpServer())
      .delete('/review/' +  new Types.ObjectId().toHexString())
      .set('Authorization', 'Bearer ' + token)
      .expect(404, {
        statusCode: 404,
        message: REVIEW_NOT_FOUND
      });
  });


    afterAll(() => {
      disconnect()
  })
})
