import { Test, TestingModule } from '@nestjs/testing';
import { KoreanController } from './korean.controller';

describe('KoreanController', () => {
  let controller: KoreanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KoreanController],
    }).compile();

    controller = module.get<KoreanController>(KoreanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
