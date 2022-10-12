import dayjs from 'dayjs';
import { Trainee } from '../typings.js';
import { log } from './logger.js';

export function getTargetTrainees(trainees: Trainee[]) {
  return trainees.filter((trainee: Trainee) => {
    if (trainee.exclude) {
      return false;
    }
    if (dayjs().isBefore(dayjs(trainee.startDate)) || dayjs().isAfter(dayjs(trainee.endDate))) {
      log.w(`${trainee.name} > 전송 기간 X`);
      return false;
    }
    return true;
  });
}
