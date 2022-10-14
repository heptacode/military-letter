import { postRequest } from '@heptacode/http-request';
import { stringify } from 'qs';
import { config, paths } from '../config.js';
import { LetterDetails, Trainee } from '../typings.js';
import { getId } from './getId.js';

/**
 * 편지 보내기
 * @param {Trainee} trainee
 * @param {LetterDetails} letterDetails
 * @returns {void} void
 */
export async function writeLetter(trainee: Trainee, letterDetails: LetterDetails): Promise<void> {
  const traineeIdx = config.trainees.findIndex(
    _trainee => _trainee.name === trainee.name && _trainee.birthDate === trainee.birthDate
  );

  if (!trainee.id) {
    config.trainees[traineeIdx].id = await getId(trainee);
  }

  await postRequest<void>(
    paths.airForce.writeLetter,
    stringify({
      siteId: 'last2',
      command2: 'writeEmail',
      memberSeqVal: trainee.id ?? config.trainees[traineeIdx].id,
      senderName: letterDetails.author,
      relationship: '지인',
      title: `[${letterDetails.author}] ${letterDetails.title}`,
      contents: letterDetails.content.replace(/(?:\r\n|\r|\n)/g, ' / '),
      password: config.airForceLetterPassword,
    }),
    config.httpRequestConfig
  );
}
