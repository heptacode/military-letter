import { postRequest } from '@heptacode/http-request';
import { stringify } from 'qs';
import { config } from '../config';
import { Trainee, TraineeUnit } from '../typings';
import { getDateWithHyphens } from '../utils/dateConverter';

/**
 * 육군 훈련병 추가하기
 * @param {Trainee} trainee
 * @returns {boolean} 등록에 성공하면 true, 이미 등록된 군인이면 false
 */
export async function addTrainee(trainee: Trainee): Promise<boolean> {
  const response = await postRequest<any>(
    config.baseUrl.army,
    '/missTrainee/insertDirectMissTraineeA.do',
    stringify({
      iuid: config.iuid,
      name: trainee.name,
      birth: getDateWithHyphens(trainee.birthDate),
      enterDate: getDateWithHyphens(trainee.enterDate),
      trainUnitCd: trainee.unit
        ? TraineeUnit[trainee.unit as unknown as keyof typeof TraineeUnit]
        : '20020191700', // default: 육군훈련소
      missTraineeClassCdNm: '예비군인/훈련병',
      grpCd: '0000010001', // 육군
      grpCdNm: '육군',
      missTraineeClassCd: '0000490001', // '예비군인/훈련병'
    }),
    config.httpRequestConfig
  );

  return Boolean(response.data?.resultCd !== 'E001');
}
