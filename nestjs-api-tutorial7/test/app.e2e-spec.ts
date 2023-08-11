import { Test } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaConnectionService } from './../src/prisma-connection/prisma-connection.service';
import * as pactum from 'pactum';
import * as testUtils from '../testUtils/index';

describe('App e2e', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const port = 3333;
    const urlBase = `http://localhost:${port}`;
    let prisma: PrismaConnectionService;

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
    await app.listen(port); //unblock for 1st run, block for re-run

    prisma = app.get(PrismaConnectionService);
    await prisma.cleanDb();
    pactum.request.setBaseUrl(urlBase);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Auth', () => {
    describe('Signup ---', () => {
      const urlAppended = '/auth/signup';

      it('should throw if email empty', () => {
        const data = { password: testUtils.authDto.password };
        return pactum.spec().post(urlAppended).withBody(data).expectStatus(400);
      });

      it('should throw if email empty', () => {
        const data = { email: testUtils.authDto.email };
        return pactum.spec().post(urlAppended).withBody(data).expectStatus(400);
      });

      it('should throw if no body provided', () => {
        return pactum.spec().post(urlAppended).expectStatus(400);
      });

      it('should sign-up', () => {
        const data = testUtils.authDto;
        return pactum
          .spec()
          .post(urlAppended)
          .withBody(data)
          .stores('tai_Data', 'accessToken') //3h00ms22ss
          .expectStatus(201)
          .inspect();
      });
    });

    describe('Signin  ---', () => {
      const urlAppended = '/auth/signin';

      it('should sign-in', () => {
        const data = testUtils.authDto;
        return pactum
          .spec()
          .post(urlAppended)
          .withBody(data)
          .expectStatus(201)
          .inspect();
      });

      it('should throw if email empty', () => {
        const data = { password: testUtils.authDto.password };
        return pactum.spec().post(urlAppended).withBody(data).expectStatus(400);
      });

      it('should throw if email empty', () => {
        const data = { email: testUtils.authDto.email };
        return pactum.spec().post(urlAppended).withBody(data).expectStatus(400);
      });

      it('should throw if no body provided', () => {
        return pactum.spec().post(urlAppended).expectStatus(400);
      });

      it.todo('todo sign-in -----');
    });
  });

  describe('User ---', () => {
    const headers = { Authorization: 'Bearer $S{tai_Data}' }; //3h00ms22ss
    describe('get me', () => {
      const urlAppended = '/users/me';
      const data = testUtils.authDto;
      it('should get me', () => {
        return pactum
          .spec()
          .get(urlAppended)
          .withBody(data)
          .withHeaders(headers) //3h00ms22ss
          .expectStatus(200)
          .inspect();
      });
    });

    describe('edit user ', () => {
      const urlAppended = '/users';
      const data = testUtils.editUserDto;
      const email = data.email;

      it('should edit user', () => {
        return pactum
          .spec()
          .patch(urlAppended) //3h09ms56ss
          .withBody(data)
          .withHeaders(headers)
          .expectBodyContains(email) //3h11ms21ss
          .expectStatus(200)
          .inspect();
      });
    });
  });

  /* 3h23ms42ss */
  describe('Bookmarks', () => {
    const headers = { Authorization: 'Bearer $S{tai_Data}' };
    describe('Get empty bookmark ---', () => {
      const urlAppended = '/bookmarks';
      it('should get empty bookmark', () => {
        return pactum
          .spec()
          .get(urlAppended) //3h09ms56ss
          .withHeaders(headers)
          .expectBody([]) //3h27ms25ss
          .expectStatus(200)
          .inspect();
      });
    });

    describe('Create bookmark ---', () => {
      const urlAppended = '/bookmarks';
      const data = testUtils.createBookmark;
      it('should create bookmark', () => {
        return pactum
          .spec()
          .post(urlAppended)
          .withHeaders(headers)
          .withBody(data)
          .expectStatus(201)
          .inspect();
      });
    });

    describe('Get bookmarks after creating ---', () => {
      const urlAppended = '/bookmarks';
      it('should get bookmarks after creating', () => {
        return pactum
          .spec()
          .get(urlAppended)
          .withHeaders(headers)
          .expectStatus(200)
          .expectJsonLength(1) //3h31ms29ss
          .stores('bookmarkId', 'id')
          .inspect();
      });
    });

    describe('Get bookmark by Id ---', () => {
      //way1
      const key = 'anyName';
      const bookmarkIdVal = '$S{bookmarkId}';
      const urlAppended = `/bookmarks`; //xx10

      //way 1,
      it('should get bookmark by Id - way 1', () => {
        return pactum
          .spec()
          .get(urlAppended)
          .withHeaders(headers)
          .withPathParams(key, bookmarkIdVal) //way 1,3h31ms52ss, xx10
          .expectStatus(200)
          .inspect();
      });

      //way 2
      it('should get bookmark by Id - way 2', () => {
        return pactum
          .spec()
          .get(urlAppended)
          .withHeaders(headers)
          .withQueryParams(key, bookmarkIdVal) //way 2, 3h31ms52ss, xx10
          .expectStatus(200)
          .inspect();
      });

      it('should get bookmark by Id - way 3', () => {
        const urlAppended2 = `/bookmarks/${bookmarkIdVal}`; //way 3, 3h31ms52ss
        return pactum
          .spec()
          .get(urlAppended2)
          .withHeaders(headers)
          .expectStatus(200)
          .inspect();
      });
    });

    // 3h34ms23ss
    describe('Edit bookmark ---', () => {
      const bookmarkIdVal = '$S{bookmarkId}';
      const urlAppended = `/bookmarks/${bookmarkIdVal}`;
      const data = {
        title: `${testUtils.editBookmark.title} to $S{bookmarkId}`,
        description: `${testUtils.editBookmark.description} to $S{bookmarkId}`,
      };
      it(`should edit bookmark 3`, () => {
        return pactum
          .spec()
          .patch(urlAppended)
          .withHeaders(headers)
          .withBody(data)
          .expectStatus(200)
          .inspect();
      });
    });

    describe('Del bookmark ---', () => {
      const bookmarkIdVal = '$S{bookmarkId}';
      const urlAppended = `/bookmarks/${bookmarkIdVal}`;
      const data = {
        title: `${testUtils.editBookmark.title} to $S{bookmarkId}`,
        description: `${testUtils.editBookmark.description} to $S{bookmarkId}`,
      };
      it.todo(`Del bookmark by id is done`);

      // it('should del bookmark by id', () => {
      //   return pactum
      //     .spec()
      //     .delete(urlAppended)
      //     .withHeaders(headers)
      //     .withBody(data)
      //     .expectStatus(200)
      //     .inspect();
      // });
    });
  });
});
