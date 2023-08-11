import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaConnectionService } from '../src/prisma-connection/prisma-connection.service';
//test2
describe('App e2e', () => {
  let app: INestApplication; //2h33ms17ss
  let prisma: PrismaConnectionService;

  // 2h30ms13ss
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    //2h33ms17ss
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();

    //2h49ms06ss
    prisma = app.get(PrismaConnectionService);
    await prisma.cleanDb();
    console.log('cleanDb triiggered --------');
  });

  afterAll(async () => {
    await app.close();
  });
  it.todo('should pass ---'); //2h28ms48ss
});
