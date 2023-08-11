// 2h28ms18ss
import { Test } from '@nestjs/testing'; //2h30ms25ss
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';

//test1
describe('App e2e', () => {
  let app: INestApplication; //2h33ms17ss

  // 2h30ms25ss
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule], //2h30ms25ss
    }).compile();

    //2h33ms17ss
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });
  it.todo('should pass ---');
});

/*test1 */
// describe('App e2e', () => {
//   // 2h30ms25ss
//   beforeAll(async () => {
//     const moduleRef = await Test.createTestingModule({
//       imports: [AppModule], //2h30ms25ss
//     }).compile();
//   });

//   it.todo('should pass ---');
// });

/*test1, 2h28ms48ss */
// describe('App e2e TAI', () => {
//   it.todo('it should pass ---');
//   test.todo('test should pass ---'); //or others
// });
