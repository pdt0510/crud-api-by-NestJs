import { Test } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaConnectionService } from './../src/prisma-connection/prisma-connection.service';
import * as pactum from 'pactum';
import * as testUtils from '../testUtils/index';

//test3
describe('App e2e', () => {
  const port = 3333;
  let app: INestApplication;
  let prisma: PrismaConnectionService;
  const urlBase = 'http://localhost:3333';

  beforeAll(async () => {
    console.log('beforeAll ------');
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
    // await app.listen(port); //2h53ms13ss, xx7

    prisma = app.get(PrismaConnectionService);
    await prisma.cleanDb();
    console.log('cleanDb ------');
    pactum.request.setBaseUrl(urlBase); // 2h55ms42ss
  });

  afterAll(async () => {
    // await app.close(); //2h50ms40ss
    console.log('afterAll ------');
  });

  // 2h50ms59ss
  describe('Auth', () => {
    describe('Signup', () => {
      const urlAppended = '/auth/signup';

      //2h57ms18ss
      it('should throw if email empty', () => {
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

      // 2h53ms13ss
      it('should sign-up', () => {
        const url = 'http://localhost:3333/auth/signup';
        const data = testUtils.dtoInfo;
        return pactum
          .spec()
          .post(urlAppended) //2h55ms42ss
          .withBody(data)
          .expectStatus(201)
          .inspect();
      });
    });

    describe('Signin', () => {
      const urlAppended = '/auth/signin';

      it('should sign-in', () => {
        const data = testUtils.dtoInfo;
        return pactum
          .spec()
          .post(urlAppended)
          .withBody(data)
          .expectStatus(201)
          .inspect();
      });

      //2h57ms18ss
      it('should throw if email empty', () => {
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

      it.todo('todo sign-in -----'); //2h50ms59ss
    }); // 2h56ms42ss
  });

  describe('User', () => {
    describe('get me', () => {});
    describe('edit user', () => {});
  });

  describe('Bookmarks', () => {
    describe('Create bookmark', () => {});
    describe('Get bookmarks', () => {});
    describe('Get bookmark by id', () => {});
    describe('Edit bookmark', () => {});
    describe('Del bookmark', () => {});
  });
});
