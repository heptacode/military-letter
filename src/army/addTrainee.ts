import { postRequest } from '@heptacode/http-request';
import { stringify } from 'qs';
import { config, paths } from '../config.js';
import { TheCampResponse, Trainee, TraineeClass, TraineeGroup, TraineeUnit } from '../typings.js';
import { getDateWithHyphens } from '../utils/dateConverter.js';

export async function requestAddTrainee(trainee: Trainee): Promise<TheCampResponse> {
  const { data } = await postRequest<TheCampResponse>(
    paths.army.addTrainee,
    stringify({
      iuid: config.iuid,
      name: trainee.name,
      birth: getDateWithHyphens(trainee.birthDate),
      enterDate: getDateWithHyphens(trainee.enterDate),
      trainUnitCd: trainee.unit
        ? TraineeUnit[trainee.unit as unknown as keyof typeof TraineeUnit]
        : TraineeUnit['육군훈련소'],
      missSoldierClassCd: TraineeClass['예비군인/훈련병'],
      missSoldierClassCdNm: '예비군인/훈련병',
      grpCd: TraineeGroup['육군'],
      grpCdNm: '육군',
    }),
    config.httpRequestConfig
  );

  return data;
}

/**
 * 육군 훈련병 추가하기
 * @param {Trainee} trainee
 * @returns {boolean} 등록에 성공하면 true, 이미 등록된 훈련병이면 false
 */
export async function addTrainee(trainee: Trainee): Promise<boolean> {
  const { resultCd } = await requestAddTrainee(trainee);
  return Boolean(resultCd !== 'E001');
}
