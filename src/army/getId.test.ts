import { postRequest } from '@heptacode/http-request';
import 'dotenv/config';
import { config, paths } from '../config.js';
import { login } from './login.js';

describe('get trainee unique id', () => {
  beforeEach(async () => {
    await login({
      id: process.env.THECAMP_ID!,
      password: process.env.THECAMP_PW!,
    });
  });

  it('is status code 200', async () => {
    const { status: statusCode } = await postRequest(
      paths.army.getId,
      undefined,
      config.httpRequestConfig
    );
    expect(statusCode).toEqual(200);
  });
});
