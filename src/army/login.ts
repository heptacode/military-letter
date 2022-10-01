import { postRequest } from '@heptacode/http-request';
import { stringify } from 'qs';
import { config } from '../config';
import { extractCookies } from '../utils/extractCookies';

/**
 * 더캠프 로그인
 * @returns {void} void
 */
export async function login(): Promise<void> {
  const loginResponse = await postRequest<any>(
    config.baseUrl.army,
    '/login/loginA.do',
    stringify({
      state: 'email-login',
      autoLoginYn: 'N',
      findPwType: 'pwFind',
      userId: process.env.THECAMP_ID,
      userPwd: process.env.THECAMP_PW,
    })
  );

  const { iuid, token } = extractCookies(loginResponse.headers['set-cookie']!);
  config.iuid = iuid.match(/\d+/)![0];
  config.httpRequestConfig.headers = {
    Cookie: `${iuid}; ${token}`,
  };
}
