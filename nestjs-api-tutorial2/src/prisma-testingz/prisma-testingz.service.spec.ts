import { Test, TestingModule } from '@nestjs/testing';
import { PrismaTestingzService } from './prisma-testingz.service';

// 39ms29ss
describe('PrismaTestingzService', () => {
  let service: PrismaTestingzService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaTestingzService],
    }).compile();

    service = module.get<PrismaTestingzService>(PrismaTestingzService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
