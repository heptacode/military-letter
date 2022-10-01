import { postRequest } from '@heptacode/http-request';
import { stringify } from 'qs';
import { config } from '../config';
import { Trainee, TraineeUnit } from '../typings';

/**
 * 육군 훈련병 식별 코드 조회하기
 * @param {Trainee} trainee
 * @returns {string} id
 */
export async function getId(trainee: Trainee) {
  return (
    await postRequest<any>(
      config.baseUrl.army,
      '/consolLetter/viewConsolLetterMain.do',
      stringify({
        trainUnitEduSeq: trainee.unitId,
        trainUnitCd: trainee.unit
          ? TraineeUnit[trainee.unit as unknown as keyof typeof TraineeUnit]
          : '20020191700', // default: 육군훈련소
      }),
      config.httpRequestConfig
    )
  ).data.match(/(traineeMgrSeq = '(.*?)';)/)[2];
}
