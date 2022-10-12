import { postRequest } from '@heptacode/http-request';
import { stringify } from 'qs';
import { config } from '../config.js';
import { Trainee, TraineeUnit } from '../typings.js';
import { getDateWithoutHyphens } from '../utils/dateConverter.js';
import { log } from '../utils/logger.js';
import { getRegOrder } from './getRegOrder.js';

/**
 * 육군 더캠프 카페 가입 확인
 * @param {Trainee} trainee
 * @returns {boolean} 카페 가입 여부
 */
export async function checkCafe(trainee: Trainee): Promise<boolean> {
  const { data: cafeResult } = await postRequest<any>(
    `${config.baseUrl.army}/main/cafeCreateCheckA.do`,
    stringify({
      regOrder: await getRegOrder(trainee),
      name: trainee.name,
      birth: getDateWithoutHyphens(trainee.birthDate),
      enterDate: getDateWithoutHyphens(trainee.enterDate),
      trainUnitCd: trainee.unit
        ? TraineeUnit[trainee.unit as unknown as keyof typeof TraineeUnit]
        : '20020191700', // default: 육군훈련소
      grpCd: '0000010001', // 육군
      trainUnitTypeCd: '0000140001', // ??
      traineeRelationshipCd: '0000420006', // 친구/지인
    }),
    config.httpRequestConfig
  );

  const isAvailable = !cafeResult.resultCd.includes('M');
  if (!isAvailable) {
    log.w(`${trainee.name} > 카페 개설 X`);
  }

  return isAvailable;
}
