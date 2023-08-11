import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaConnectionService } from '../src/prisma-connection/prisma-connection.service';
import * as pactum from 'pactum'; //2h53ms19ss
import * as testUtils from '../testUtils/index';

//test3
describe('App e2e', () => {
  const port = 3333;
  let app: INestApplication;
  let prisma: PrismaConnectionService;
  const urlBase = 'http://localhost:3333';

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(port); //2h53ms19ss , xx7, xx15
    console.log(`Testing app running http://localhost:${port} --------------`);

    prisma = app.get(PrismaConnectionService);
    await prisma.cleanDb();
    pactum.request.setBaseUrl(urlBase); // 2h55ms42ss
  });

  afterAll(async () => {
    await app.close(); //xx15
  });

  describe('Auth', () => {
    describe('Signup ---', () => {
      const urlAppended = '/auth/signup'; //2h55ms42ss

      // 2h53ms19ss
      it('should sign-up', () => {
        const url = 'http://localhost:3333/auth/signup';
        const data = testUtils.dtoInfo;
        return pactum
          .spec()
          .post(urlAppended)
          .withBody(data)
          .expectStatus(201)
          .inspect();
      });

      //2h57ms18ss
      it('should throw if password empty', () => {
        const data = { password: testUtils.dtoInfo.password };
        return pactum.spec().post(urlAppended).withBody(data).expectStatus(400);
      });

      it('should throw if email empty', () => {
        const data = { email: testUtils.dtoInfo.email };
        return pactum.spec().post(urlAppended).withBody(data).expectStatus(400);
      });

      it('should throw if no body provided', () => {
        return pactum.spec().post(urlAppended).expectStatus(400);
      });
    });

    // 2h56ms42ss
    describe('Signin ---', () => {
      const urlAppended = '/auth/signin';

      // 2h56ms42ss
      it('should sign-in', () => {
        const data = testUtils.dtoInfo;
        return pactum
          .spec()
          .post(urlAppended)
          .withBody(data)
          .expectStatus(201)
          .inspect();
      });

      // //2h57ms18ss
      it('should throw if password empty', () => {
        const data = { password: testUtils.dtoInfo.password };
        return pactum.spec().post(urlAppended).withBody(data).expectStatus(400);
      });

      it('should throw if email empty', () => {
        const data = { email: testUtils.dtoInfo.email };
        return pactum.spec().post(urlAppended).withBody(data).expectStatus(400);
      });

      it('should throw if no body provided', () => {
        return pactum.spec().post(urlAppended).expectStatus(400);
      });

      it.todo(
        'always has a test (or 1st test) for avoiding err at 1st run --------------', //2h50ms59ss
      );
    });
  });
});
