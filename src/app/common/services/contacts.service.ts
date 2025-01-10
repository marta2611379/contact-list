import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { IContact } from '../interfaces/contact.interface';
import { ToastrService } from 'ngx-toastr';
import { contactsInit } from '../constants/init-contact-list';

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
    let contacts: IContact[] = contactsInit;

    localStorage.setItem('contacts', JSON.stringify(contacts));
    this.toastr.success('Список наповнено даними', 'Успішно');
  }
}
