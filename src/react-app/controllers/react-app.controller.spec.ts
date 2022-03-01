import { Test, TestingModule } from '@nestjs/testing';
import { ReactAppController } from './react-app.controller';

describe('ReactAppController', () => {
  let controller: ReactAppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReactAppController],
    }).compile();

    controller = module.get<ReactAppController>(ReactAppController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
