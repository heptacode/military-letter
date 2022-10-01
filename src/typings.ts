export enum TraineeType {
  ARMY = '육군',
  AIR_FORCE = '공군',
}

export enum TraineeUnit {
  '육군훈련소' = '20020191700',
  '육군3사관학교' = '20020920000',
  '1사단' = '20121290100',
  '2사단' = '20121490100',
  '3사단' = '20121590100',
  '5사단' = '20121690200',
  '6사단' = '20121590200',
  '7사단' = '20121390100',
  '9사단' = '20121290200',
  '11사단' = '20121790300',
  '12사단' = '20121490200',
  '15사단' = '20121390200',
  '17사단' = '20121190100',
  '20사단' = '20121790400',
  '21사단' = '20121490300',
  '22사단' = '20121890100',
  '23사단' = '20121890200',
  '25사단' = '20121290300',
  '27사단' = '20121390300',
  '28사단' = '20121690100',
  '30사단' = '20121290400',
  '31사단' = '20220280100',
  '32사단' = '20220280200',
  '35사단' = '20220280300',
  '36사단' = '20120180100',
  '37사단' = '20220280400',
  '39사단' = '20220280500',
  '50사단' = '20220280600',
  '51사단' = '20121190200',
  '53사단' = '20220280700',
  '55사단' = '20120180200',
}

export interface Trainee {
  name: string;
  type?: TraineeType;
  unit?: TraineeUnit;
  birthDate: string;
  enterDate: string;
  startDate: string;
  endDate: string;
  unitId?: string;
  id?: string;
  exclude?: boolean;
}

export interface Option {
  airForceLetterPassword: string;
  categories: string[];
  pageSize: number;
}

export interface Config extends Option {
  baseUrl: {
    airForce: string;
    army: string;
  };
  iuid: string;
  httpRequestConfig: any;
  trainees: Trainee[];
}

export interface Cookie {
  iuid: string;
  token: string;
}

export interface NewsPayload {
  category: string;
  news: News[];
}

export interface News {
  newsId: string;
  contentId: string;
  title: string;
  cpId: number;
  cpLogoUrl: string;
  cpKorName: string;
  cpEngName: string;
  imageUrl: string;
  contentUrl: string;
  regDt: number;
  modiDt: number;
  status: string;
  summary: string;
  searchId: string;
  label: string | null;
  commentCnt: number;
  delegateId: string | null;
}

export interface LetterDetails {
  author: string;
  title: string;
  content: string;
}
