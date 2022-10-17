import { postRequest } from '@heptacode/http-request';
import 'dotenv/config';
import { config, paths } from '../config.js';
import { TheCampResponse } from '../typings.js';
import { login } from './login.js';

describe('delete trainee', () => {
  beforeEach(async () => {
    await login({
      id: process.env.THECAMP_ID!,
      password: process.env.THECAMP_PW!,
    });
  });

  it('is status code 200', async () => {
    const { status: statusCode } = await postRequest<TheCampResponse>(
      paths.army.deleteTrainee,
      undefined,
      config.httpRequestConfig
    );
    expect(statusCode).toEqual(200);
  });
});
