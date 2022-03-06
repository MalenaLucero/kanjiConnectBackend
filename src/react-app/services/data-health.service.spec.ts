import { Test, TestingModule } from '@nestjs/testing';
import { DataHealthService } from './data-health.service';

describe('DataHealthService', () => {
  let service: DataHealthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataHealthService],
    }).compile();

    service = module.get<DataHealthService>(DataHealthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
