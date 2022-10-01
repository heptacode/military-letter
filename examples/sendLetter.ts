import { LetterDetails, Trainee, TraineeType, useMilitaryLetter } from '@heptacode/military-letter';

const trainees: Trainee[] = [
  {
    name: '김육군',
    birthDate: '2000-01-01',
    enterDate: '2022-01-01',
    startDate: '2022-01-01',
    endDate: '2022-02-01',
    exclude: true,
  },
  {
    name: '김공군',
    type: TraineeType.AIR_FORCE,
    birthDate: '2000-01-01',
    enterDate: '2022-01-01',
    startDate: '2022-01-01',
    endDate: '2022-02-01',
  },
];
const { airForce, army } = useMilitaryLetter(trainees);

async function compose(trainee: Trainee, letterDetails: LetterDetails) {
  switch (trainee.type) {
    /**
     * 공군 훈련병인 경우
     */
    case TraineeType.AIR_FORCE:
      await airForce.writeLetter(trainee, letterDetails);
      return;

    /**
     * 육군 훈련병인 경우
     */
    case TraineeType.ARMY:
    default:
      // 더캠프 로그인
      await army.login();

      // 보고싶은 군인 추가
      await army.addTrainee(trainee);

      // 카페 개설여부 확인
      if (!(await army.checkCafe(trainee))) {
        return;
      }

      // 편지 전송
      await army.writeLetter(trainee, letterDetails);
      return;
  }
}

/**
 * 훈련병에게 편지 보내기
 * @param {Trainee} trainee
 */
export async function sendLetter(trainee: Trainee) {
  await compose(trainee, {
    author: '김친구',
    title: '제목',
    content: '본문',
  });
}

sendLetter(trainees[0]);
