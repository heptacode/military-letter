<div align="center">

# Military Letter

</div>

## 소개

> Unofficial library to send letters to ROK Armed Forces Training Center

> 비공식 국군훈련소 인터넷 편지 라이브러리

## 알림

현재 지원되는 군종은 육군(더캠프), 공군입니다.
이 라이브러리를 사용함으로써 발생하는 문제에 대한 책임은 사용자에게 있습니다.

## 기술 스택

![TypeScript](https://img.shields.io/badge/TypeScript-282C34.svg?&style=for-the-badge&logo=typescript)
![Yarn Berry](https://img.shields.io/badge/Yarn_Berry-282C34.svg?&style=for-the-badge&logo=yarn)
![ESBuild](https://img.shields.io/badge/ESBuild-282C34.svg?&style=for-the-badge&logo=esbuild)
![Jest](https://img.shields.io/badge/Jest-282C34.svg?&style=for-the-badge&logo=jest)

## 사용하기

- $ `yarn add @heptacode/military-letter`
- `examples` 폴더의 예시들을 확인해주세요.
- 별도의 설정 없이 뉴스 보내기 기능만 이용하려면 이 Repository를 [Fork](https://github.com/heptacode/military-letter/fork)한 후 trainees.example.ts 파일을 참고하여 trainees.ts 파일을 examples 폴더에 생성해주세요.
- 성명, 생년월일, 입대일자가 올바르지 않으면 정상적으로 전달되지 않습니다.

## trainees.ts 설정하기

examples/trainees.example.ts를 참고해주세요.

| 키        | 타입        | 설명                                    | 기본값         |
| --------- | ----------- | --------------------------------------- | -------------- |
| name      | string      | 훈련병 성명                             | 필수 입력 사항 |
| type      | TraineeType | 군종(육군/공군)                         | '육군'         |
| unit      | TraineeUnit | 입영부대(육군만 입력)                   | '육군훈련소'   |
| birthDate | string      | 생년월일                                | 필수 입력 사항 |
| enterDate | string      | 입영일                                  | 필수 입력 사항 |
| startDate | string      | 시작일(입영일 이후로 자유롭게 지정)     | 필수 입력 사항 |
| endDate   | string      | 종료일(수료일과 관계없이 자유롭게 지정) | 필수 입력 사항 |
| exclude   | boolean     | 대상 제외 여부                          | false          |

```ts
// examples/trainees.ts
import { Trainee, TraineeType } from '@heptacode/military-letter';

export const trainees: Trainee[] = [
  {
    name: '김육군',
    unit: '55사단', // 기본: '육군훈련소'
    birthDate: '2000-01-01',
    enterDate: '2022-01-01',
    startDate: '2022-01-01',
    endDate: '2022-02-01',
    exclude: true,
  },
  {
    name: '김공군',
    type: '공군', // 기본: '육군'
    birthDate: '2000-01-01',
    enterDate: '2022-01-01',
    startDate: '2022-01-01',
    endDate: '2022-02-01',
  },
];
```
