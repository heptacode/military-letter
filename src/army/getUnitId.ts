import { getRequest } from '@heptacode/http-request';
import { parse } from 'node-html-parser';
import { config } from '../config.js';
import { Trainee } from '../typings.js';

/**
 * 육군훈련소 교육대코드 조회
 * @param {Trainee} trainee
 * @returns {string} unitId
 */
export async function getUnitId(trainee: Trainee): Promise<string> {
  const { data: trainUnitEduSeqResponse } = await getRequest<any>(
    `${config.baseUrl.army}/eduUnitCafe/viewEduUnitCafeMain.do`,
    undefined,
    config.httpRequestConfig
  );
  const wrappers = parse(trainUnitEduSeqResponse).querySelectorAll('div.profile-wrap');
  const wrapper = wrappers.find(wrapper => wrapper.rawText.trim().includes(trainee.name))!;
  return wrapper.attrs.onclick.match(/\d+/)![0];
}
