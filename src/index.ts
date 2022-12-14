import * as AirForce from './airForce/index.js';
import * as Army from './army/index.js';
import { config } from './config.js';
import { Option, Trainee } from './typings.js';
import 'dotenv/config';

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

export * from './typings.js';
export * from './utils';
