import { Test, TestingModule } from '@nestjs/testing';
import { KoreanService } from './korean.service';

describe('KoreanService', () => {
  let service: KoreanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KoreanService],
    }).compile();

    service = module.get<KoreanService>(KoreanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
