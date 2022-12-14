import { getRequest } from '@heptacode/http-request';
import { parse } from 'node-html-parser';
import { config, paths } from '../config.js';
import { Trainee } from '../typings.js';

/**
 * 육군 훈련병 등록 순서 가져오기
 * @param {Trainee} trainee
 * @returns {string} regOrder
 */
export async function getRegOrder(trainee: Trainee): Promise<string> {
  const { data: traineeRegListResponse } = await getRequest<any>(
    paths.army.getRegOrder,
    undefined,
    config.httpRequestConfig
  );
  const wrappers = parse(traineeRegListResponse).querySelectorAll('div.profile-info-area');
  const wrapper = wrappers.find(wrapper => wrapper.rawText.trim().includes(trainee.name))!;
  return wrapper.querySelector('a.btn-profile-set')!.attrs.href.match(/\d+/)![0];
}
