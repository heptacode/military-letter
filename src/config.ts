import { Agent } from 'https';
import { Config, Option } from './typings';

export const options: Option = {
  airForceLetterPassword: 'P@$$W0RD',
  categories: ['digital', 'society', 'politics', 'economic', 'foreign'],
  pageSize: 24,
};

export const config: Config = {
  airForceLetterPassword: 'P@$$W0RD',
  categories: ['digital', 'society', 'politics', 'economic', 'foreign'],
  pageSize: 24,
  baseUrl: {
    airForce: 'https://www.airforce.mil.kr/user',
    army: 'https://www.thecamp.or.kr',
  },
  iuid: '',
  httpRequestConfig: {
    httpsAgent: new Agent({
      rejectUnauthorized: false,
    }),
  },
  trainees: [],
};
