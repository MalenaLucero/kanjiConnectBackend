import { Test, TestingModule } from '@nestjs/testing';
import { UserKanjiController } from './user-kanji.controller';

describe('UserKanjiController', () => {
  let controller: UserKanjiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserKanjiController],
    }).compile();

    controller = module.get<UserKanjiController>(UserKanjiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
