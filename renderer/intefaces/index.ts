export interface User {
    name: string,
    motherName: string,
    phone1: string,
    phone2: string | any,
    bornDate: string,
    gradeYear: string,
    gradeType: string,
    cpf: string,
    observation: string
}

export interface Lesson {
    startAt: Date;
    endAt: Date;
    value: number;
}

export interface EditLecture {
    startAt: Date | string;
    endAt: Date | string;
    value: number;
    payed: boolean;
    presence: boolean
}

declare global {
    interface Window {
      main: {
            sayHello: () => void;
          receiveHello: (handler: (event, args) => void) => void;
          stopReceivingHello: (handler: (event, args) => void) => void;
      };
    }
}

export type Phone = {
  user_cpf: string,
  number: string,
  id?: string 
}
