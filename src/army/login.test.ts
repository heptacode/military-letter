import { postRequest } from '@heptacode/http-request';
import 'dotenv/config';
import { stringify } from 'qs';
import { paths } from '../config.js';
import { login } from './login.js';

async function loginRequest(userId?: string, userPwd?: string) {
  return await postRequest<any>(
    paths.army.login,
    stringify({
      state: 'email-login',
      autoLoginYn: 'N',
      findPwType: 'pwFind',
      userId: userId,
      userPwd: userPwd,
    })
  );
}

describe('login', () => {
  describe('with unexisting account', () => {
    it('is result code 9000', async () => {
      const response = await loginRequest('test@example.com', 'password');
      expect(response.data.resultCd).toEqual('9000');
    });
  });

  describe('without email input', () => {
    it('is result code 9006', async () => {
      const response = await loginRequest(undefined, 'password');
      expect(response.data.resultCd).toEqual('9006');
    });
  });

  describe('without password input', () => {
    it('is result code 9000', async () => {
      const response = await loginRequest('test@example.com', undefined);
      expect(response.data.resultCd).toEqual('9000');
    });
  });

  it('is feature working', async () => {
    await login({
      id: process.env.THECAMP_ID!,
      password: process.env.THECAMP_PW!,
    });
  });
});
