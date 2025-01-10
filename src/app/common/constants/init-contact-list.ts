import { IContact } from '../interfaces/contact.interface';

export const contactsInit: IContact[] = [
  {
    id: new Date('2024-12-31T15:30:00').getTime().toString(),
    firstname: 'Марта',
    lastname: 'Марцінків',
    gender: 'female',
    email: 'marta2611379@gmail.com',
    phone: '+380934975099',
    birthdate: '1998-11-26',
    address: 'м. Львів, вул. Володимира Великого, 12',
  },
  {
    id: new Date('2024-12-31T15:31:00').getTime().toString(),
    firstname: 'Тарас',
    lastname: 'Шевченко',
    surname: 'Григорович',
    gender: 'male',
    email: 'kobzar@gmail.com',
    phone: '+380934343444',
    birthdate: '1814-03-09',
    address: 'с. Моринці, Київська область',
  },
  {
    id: new Date('2024-12-31T15:32:00').getTime().toString(),
    firstname: 'Степан',
    lastname: 'Бандера',
    surname: 'Андрійович',
    gender: 'male',
    email: 'nationalist@gmail.com',
    phone: '+380934343443',
    birthdate: '1909-01-01',

    address: 'с. Старий Угринів, Калуський район, Івано-Франківська область',
  },

  {
    id: new Date('2024-12-31T15:33:00').getTime().toString(),
    firstname: 'Євген',
    lastname: 'Коновалець',
    gender: 'male',
    email: 'konovalets_oun@gmail.com',
    phone: '+380934343442',
    birthdate: '1891-06-14',
    address: 'с. Зашків, Стрийський район, Львівська область',
  },
];
