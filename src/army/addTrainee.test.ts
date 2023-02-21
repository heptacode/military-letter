import 'dotenv/config';
import { testTrainees } from '../config.js';
import { requestAddTrainee } from './addTrainee.js';
import { login } from './login.js';

describe('add trainee to list', () => {
  beforeEach(async () => {
    await login({
      id: process.env.THECAMP_ID!,
      password: process.env.THECAMP_PW!,
    });
  });

  it('is result code not E001', async () => {
    const { resultCd: resultCode } = await requestAddTrainee(testTrainees[0]);
    expect(resultCode).not.toEqual('E001');
  });
});
