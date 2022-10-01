import * as AirForce from './airForce';
import * as Army from './army';
import { config } from './config';
import { Option, Trainee } from './typings';

const airForce = {
  getId: AirForce.getId,
  sendNews: AirForce.sendNews,
  writeLetter: AirForce.writeLetter,
};

const army = {
  addTrainee: Army.addTrainee,
  checkCafe: Army.checkCafe,
  getId: Army.getId,
  getRegOrder: Army.getRegOrder,
  login: Army.login,
  sendNews: Army.sendNews,
  writeLetter: Army.writeLetter,
};

export function useMilitaryLetter(trainees: Trainee[], options?: Option) {
  if (options) {
    if (options.airForceLetterPassword) {
      config.airForceLetterPassword = options.airForceLetterPassword;
    }
    if (options.categories) {
      config.categories = options.categories;
    }
    if (options.pageSize) {
      config.pageSize = options.pageSize;
    }
  }
  config.trainees = trainees;

  return { airForce, army };
}

export * from './typings';
export * from './utils';
