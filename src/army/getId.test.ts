import { postRequest } from '@heptacode/http-request';
import { config, paths } from '../config.js';
import { login } from './login.js';

describe('get trainee unique id', () => {
  beforeEach(async () => {
    await login();
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
