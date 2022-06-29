import msg from './message';
export const MSG = msg;

export enum ROLE {
  ADMIN = 'ADMIN',
  DOC = 'DOC',
  EMP = 'EMP',
};

export enum ESexOfPet {
  male = 'Đực',

  female = 'Cái',
};
export enum ESexOfHuman {
  male = 'male',
  female = 'female'
}
export enum isChecked {
  TRUE = 1,
  FALSE = 0

}
export enum STATUS_SCHEDULE {
  SUCCESS = 'success',
  ACTIVE = 'active',
  CANCEL = 'cancel'

}