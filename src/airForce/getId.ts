import { getRequest } from '@heptacode/http-request';
import dayjs from 'dayjs';
import { parse } from 'node-html-parser';
import { config, paths } from '../config.js';
import { Trainee } from '../typings.js';

/**
 * 공군 훈련병 코드 조회
 * @param {Trainee} trainee
 * @returns {string} id
 */
export async function getId(trainee: Trainee): Promise<string> {
  const { data } = await getRequest<any>(
    paths.airForce.getId,
    {
      siteId: 'last2',
      searchName: encodeURI(trainee.name),
      searchBirth: dayjs(trainee.birthDate).format('YYYYMMDD'),
    },
    config.httpRequestConfig
  );
  const wrapper = parse(data).querySelector('input[type=button].choice')!;
  return wrapper.attrs.onclick.match(/\d+/)![0];
}
