import {
  getNews,
  getTargetTrainees,
  log,
  NewsPayload,
  Trainee,
  TraineeType,
  useMilitaryLetter,
} from '@heptacode/military-letter';
import 'dotenv/config';
import { trainees } from './trainees.js';

const { airForce, army } = useMilitaryLetter(trainees);

async function composeNews(trainee: Trainee, newsList: NewsPayload[]) {
  switch (trainee.type) {
    /**
     * 공군 훈련병인 경우
     */
    case TraineeType.AIR_FORCE:
      for (const newsItem of newsList) {
        await airForce.sendNews(trainee, newsItem);
        log.s(`공군 ${trainee.name} > ${newsItem.category.toUpperCase()}`);
      }
      return;

    /**
     * 육군 훈련병인 경우
     */
    case TraineeType.ARMY:
    default:
      // 더캠프 로그인
      await army.login({
        id: process.env.THECAMP_ID!,
        password: process.env.THECAMP_PW!,
      });

      // 보고싶은 군인 추가
      await army.addTrainee(trainee);

      // 카페 개설여부 확인
      if (!(await army.checkCafe(trainee))) {
        return;
      }

      // 뉴스 전송
      for (const newsItem of newsList) {
        await army.sendNews(trainee, newsItem);
        log.s(`육군 ${trainee.name} > ${newsItem.category.toUpperCase()}`);
      }
      return;
  }
}

/**
 * 훈련병에게 뉴스 보내기
 * @param {Trainee} trainee
 */
export async function sendNews(trainee: Trainee) {
  const newsList: NewsPayload[] = await getNews();

  await composeNews(trainee, newsList);
}

/**
 * 여러 훈련병에게 뉴스 보내기
 * @param {Trainee[]} trainees
 */
export async function sendNewsToMany(trainees: Trainee[]) {
  const newsList: NewsPayload[] = await getNews();

  for (const trainee of getTargetTrainees(trainees)) {
    await composeNews(trainee, newsList);
  }
}

sendNewsToMany(trainees);
