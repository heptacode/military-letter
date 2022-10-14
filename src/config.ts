import { Agent } from 'https';
import { APIPath, Config, Option, Trainee, TraineeType, TraineeUnit } from './typings.js';

export const options: Option = {
  airForceLetterPassword: 'P@$$W0RD',
  categories: ['digital', 'society', 'politics', 'economic', 'foreign'],
  pageSize: 24,
};

export const config: Config = {
  airForceLetterPassword: 'P@$$W0RD',
  categories: ['digital', 'society', 'politics', 'economic', 'foreign'],
  pageSize: 24,
  baseUrl: {
    airForce: 'https://www.airforce.mil.kr/user',
    army: 'https://www.thecamp.or.kr',
  },
  iuid: '',
  httpRequestConfig: {
    httpsAgent: new Agent({
      rejectUnauthorized: false,
    }),
  },
  trainees: [],
};

export const paths: APIPath = {
  airForce: {
    getId: `${config.baseUrl.airForce}/emailPicViewSameMembers.action`,
    writeLetter: `${config.baseUrl.airForce}/emailPicSaveEmail.action`,
  },
  army: {
    addTrainee: `${config.baseUrl.army}/missSoldier/insertDirectMissSoldierA.do`,
    checkCafe: `${config.baseUrl.army}/main/cafeCreateCheckA.do`,
    deleteTrainee: `${config.baseUrl.army}/missSoldier/deleteMissSoldierA.do`,
    getId: `${config.baseUrl.army}/consolLetter/viewConsolLetterMain.do`,
    getRegOrder: `${config.baseUrl.army}/missSoldier/viewMissSoldierRegList.do`,
    getUnitId: `${config.baseUrl.army}/eduUnitCafe/viewEduUnitCafeMain.do`,
    login: `${config.baseUrl.army}/login/loginA.do`,
    writeLetter: `${config.baseUrl.army}/consolLetter/insertConsolLetterA.do`,
  },
};

export const testTrainees: Trainee[] = [
  {
    name: '훈련병',
    type: TraineeType.ARMY,
    unit: TraineeUnit['55사단'],
    birthDate: '2000-01-01',
    enterDate: '2022-01-01',
    startDate: '2022-01-01',
    endDate: '2022-02-01',
  },
];
