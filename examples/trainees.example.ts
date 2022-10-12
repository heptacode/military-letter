import { Trainee, TraineeType } from '@heptacode/military-letter';

export const trainees: Trainee[] = [
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
