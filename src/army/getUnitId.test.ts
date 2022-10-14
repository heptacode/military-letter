import { getRequest } from '@heptacode/http-request';
import { config, paths } from '../config.js';
import { login } from './login.js';

describe('get trainee unit id', () => {
  beforeEach(async () => {
    await login();
  });

  it('is status code 200', async () => {
    const { status: statusCode } = await getRequest(
      paths.army.getUnitId,
      undefined,
      config.httpRequestConfig
    );
    expect(statusCode).toEqual(200);
  });
});
