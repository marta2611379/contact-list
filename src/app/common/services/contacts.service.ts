import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { IContact } from '../interfaces/contact.interface';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private toastr: ToastrService
  ) {}

  public get(): IContact[] {
    if (isPlatformBrowser(this.platformId)) {
      let contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
      // contacts = contacts.map((contact: IContact) => {
      //   contact.birthdate = this.formatDate(contact.birthdate);
      //   return contact;
      // });
      return contacts;
    }
    return [];
  }

  public getById(id: string): IContact | null {
    let contacts = this.get();
    return contacts.find((contact) => contact.id === id) || null;
  }

  public remove(id: string): void {
    let contacts = this.get();
    let index = contacts.findIndex((c) => c.id === id);
    contacts.splice(index, 1);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    this.toastr.success('Контакт видалено', 'Успішно');
  }

  public save(value: IContact): void {
    let contacts = this.get();
    const contact = Object.assign(value, {
      id: Date.now().toString(),
    });
    contacts.push(contact);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    this.toastr.success('Контакт збережено', 'Успішно');
  }

  public update(id: string, value: IContact): void {
    let contacts = this.get();
    const contact = Object.assign(value, {
      id: id,
    });
    let index = contacts.findIndex((c) => c.id === id);
    contacts.splice(index, 1, contact);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    this.toastr.success('Контакт оновлено', 'Успішно');
  }

  public clear(): void {
    localStorage.removeItem('contacts');
    //  this.toastr.success('Список очищено', 'Успішно');
  }

  public search(query: string): IContact[] {
    let contacts = this.get();
    return contacts.filter((contact) =>
      Object.values(contact).some((value) =>
        value?.toString().toLowerCase().includes(query.toLowerCase())
      )
    );
  }

  private formatDate(date: string): string {
    const dateObj = new Date(date);
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();

    return `${day}-${month}-${year}`;
  }

  public initContacts(): void {
    this.clear();
    let contacts = [
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

        address:
          'с. Старий Угринів, Калуський район, Івано-Франківська область',
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

    localStorage.setItem('contacts', JSON.stringify(contacts));

    this.toastr.success('Список наповнено даними', 'Успішно');
  }
}
