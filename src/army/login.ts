import { postRequest } from '@heptacode/http-request';
import { stringify } from 'qs';
import { config, paths } from '../config.js';
import { TheCampLoginParams } from '../typings.js';
import { extractCookies } from '../utils/extractCookies.js';

/**
 * 더캠프 로그인
 * @params {TheCampLoginParams} TheCampLoginParams
 * @returns {void} void
 */
export async function login({ id, password }: TheCampLoginParams): Promise<void> {
  if (!id || !password) {
    throw new Error('Invalid Credentials');
  }

  const { headers, data } = await postRequest<any>(
    paths.army.login,
    stringify({
      state: 'email-login',
      autoLoginYn: 'N',
      findPwType: 'pwFind',
      userId: id,
      userPwd: password,
    })
  );

  if (data.resultCd !== '0000') {
    throw new Error('Login Failed');
  }

  const { iuid, token } = extractCookies(headers['set-cookie']!);
  config.iuid = iuid.match(/\d+/)![0];
  config.httpRequestConfig.headers = {
    Cookie: `${iuid}; ${token}`,
  };
}
