import { postRequest } from '@heptacode/http-request';
import { stringify } from 'qs';
import { config, paths } from '../config.js';
import { LetterDetails, Trainee, TraineeUnit } from '../typings.js';
import { getId } from './getId.js';
import { getUnitId } from './getUnitId.js';

/**
 * 육군 훈련병에게 편지 보내기
 * @param {Trainee} trainee
 * @param {LetterDetails} letterDetails
 * @returns {void} void
 */
export async function writeLetter(trainee: Trainee, letterDetails: LetterDetails): Promise<void> {
  const traineeIdx = config.trainees.findIndex(
    _trainee => _trainee.name === trainee.name && _trainee.birthDate === trainee.birthDate
  );

  if (!trainee.unitId || !trainee.id) {
    config.trainees[traineeIdx].unitId = await getUnitId(trainee);
    config.trainees[traineeIdx].id = await getId(trainee);
  }

  await postRequest<void>(
    paths.army.writeLetter,
    stringify({
      trainUnitCd: trainee.unit
        ? TraineeUnit[trainee.unit as unknown as keyof typeof TraineeUnit]
        : TraineeUnit['육군훈련소'],
      trainUnitEduSeq: trainee.unitId ?? config.trainees[traineeIdx].unitId,
      traineeMgrSeq: trainee.id ?? config.trainees[traineeIdx].id,
      sympathyLetterSubject: `[${letterDetails.author}] ${letterDetails.title}`,
      sympathyLetterContent: letterDetails.content.replace(/(?:\r\n|\r|\n)/g, '<br>'),
      boardDiv: 'sympathyLetter',
      tempSaveYn: 'N',
    }),
    config.httpRequestConfig
  );
}
