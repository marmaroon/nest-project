import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { getModelToken } from 'nestjs-typegoose';
import { ReviewService } from './review.service';


describe('ReviewService', () => {
  let service: ReviewService; //используется для доступа к экземпляру ReviewService

  const mockReviewRepository = {
    find: jest.fn().mockReturnValue({ exec: jest.fn() }),
  };

  //это тип в jest, которая позволяет эмулировать функцию
  // const exec = {exec: jest.fn()} //эмулирует функциональность, возвращающуюся из репозитория обзоров
  // const reviewRepositoryFactory = () => ({ //вместо реального find возвращается exec, который прописали раньше
  //   find: () => exec
  // });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({ //nest
      providers: [
        ReviewService, 
        { useFactory: () => mockReviewRepository, provide: getModelToken('ReviewModel')} //почему не импортируем всю модель?
      ],
    }).compile();

    service = module.get<ReviewService>(ReviewService);
  });
         
  it('should be defined', () => {
    expect(service).toBeDefined();
  });  //проверка что экземпляр определен

  it('should findByProductId', async () => {
    const id = new Types.ObjectId().toHexString();
    mockReviewRepository.find().exec.mockReturnValueOnce([{productId: id}]);
    const res = await service.findByProductId(id)
    expect(res[0].productId).toBe(id) //простое сравнение айдишников, как пример
  });
});
