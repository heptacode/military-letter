import { postRequest } from '@heptacode/http-request';
import { stringify } from 'qs';
import { config, paths } from '../config.js';
import { TheCampResponse, Trainee } from '../typings.js';
import { getRegOrder } from './getRegOrder.js';

export async function requestDeleteTrainee(trainee: Trainee): Promise<number> {
  const { status: statusCode } = await postRequest<TheCampResponse>(
    paths.army.deleteTrainee,
    stringify({
      regOrder: await getRegOrder(trainee),
    }),
    config.httpRequestConfig
  );

  return statusCode;
}

/**
 * 육군 훈련병 삭제하기
 * @param {Trainee} trainee
 */
export async function deleteTrainee(trainee: Trainee): Promise<void> {
  await requestDeleteTrainee(trainee);
  return;
}
