import { postRequest } from '@heptacode/http-request';
import { stringify } from 'qs';
import { config, paths } from '../config.js';
import { Trainee, TraineeUnit } from '../typings.js';

/**
 * 육군 훈련병 식별 코드 조회하기
 * @param {Trainee} trainee
 * @returns {string} id
 */
export async function getId(trainee: Trainee) {
  return (
    await postRequest<any>(
      paths.army.getId,
      stringify({
        trainUnitEduSeq: trainee.unitId,
        trainUnitCd: trainee.unit
          ? TraineeUnit[trainee.unit as unknown as keyof typeof TraineeUnit]
          : TraineeUnit['육군훈련소'],
      }),
      config.httpRequestConfig
    )
  ).data.match(/(traineeMgrSeq = '(.*?)';)/)[2];
}
