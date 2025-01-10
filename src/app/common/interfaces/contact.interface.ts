import e from 'express';

export interface IContact {
  id: string;
  firstname: string;
  lastname: string;
  surname?: string;
  gender: string;
  email: string;
  phone: string;
  birthdate: string;
  address: string;
}
