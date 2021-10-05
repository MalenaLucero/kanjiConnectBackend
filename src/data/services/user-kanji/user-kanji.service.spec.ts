import { Test, TestingModule } from '@nestjs/testing';
import { UserKanjiService } from './user-kanji.service';

describe('UserKanjiService', () => {
  let service: UserKanjiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserKanjiService],
    }).compile();

    service = module.get<UserKanjiService>(UserKanjiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
