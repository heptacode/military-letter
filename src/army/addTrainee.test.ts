import { testTrainees } from '../config.js';
import { requestAddTrainee } from './addTrainee.js';
import { deleteTrainee } from './deleteTrainee.js';
import { login } from './login.js';

describe('add trainee to list', () => {
  beforeEach(async () => {
    await login();
  });

  it('is result code 9999', async () => {
    const { resultCd: resultCode } = await requestAddTrainee(testTrainees[0]);
    expect(resultCode).toEqual('9999');
  });

  afterAll(async () => {
    await deleteTrainee(testTrainees[0]);
  });
});
