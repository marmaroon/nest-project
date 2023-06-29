import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { getModelToken } from 'nestjs-typegoose';
import { ReviewService } from './review.service';


describe('ReviewService', () => {
  let service: ReviewService;

  const mockReviewRepository = {
    find: jest.fn().mockReturnValue({ exec: jest.fn() }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewService, 
        { useFactory: () => mockReviewRepository, provide: getModelToken('ReviewModel')}
      ],
    }).compile();

    service = module.get<ReviewService>(ReviewService);
  });
         
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should findByProductId', async () => {
    const id = new Types.ObjectId().toHexString();
    mockReviewRepository.find().exec.mockReturnValueOnce([{productId: id}]);
    const res = await service.findByProductId(id)
    expect(res[0].productId).toBe(id)
  });
});
