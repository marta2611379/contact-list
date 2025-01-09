import { Component } from '@angular/core';
import { IContact } from '../../../common/interfaces/contact.interface';
import { Router } from '@angular/router';
import { ContactsService } from '../../../common/services/contacts.service';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list',
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  private contacts: IContact[] = [];
  public filteredContacts: IContact[] = [];
  private searchSubject = new Subject<string>();

  constructor(
    private readonly router: Router,
    private readonly contactService: ContactsService
  ) {}

  ngOnInit(): void {
    this.contacts = this.contactService.get();
    this.filteredContacts = this.contacts;

    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((query) => {
        this.filteredContacts = this.contactService.search(query);
        console.log(this.filteredContacts);
      });
  }

  public init(): void {
    this.contactService.initContacts();
    this.contacts = this.contactService.get();
    this.filteredContacts = this.contacts;
    this.searchSubject.next('');
  }

  public remove(id: string): void {
    if (confirm('Are you sure you want to delete this contact?')) {
      this.contactService.remove(id);
      this.contacts = this.contactService.get();
    } else {
      return;
    }
  }

  public create(): void {
    this.router.navigate(['/create']);
  }

  public edit(id: string): void {
    this.router.navigate(['/edit', btoa(id)]);
  }

  public info(id: string): void {
    this.router.navigate(['/info', btoa(id)]);
  }

  public onSearch(event: Event): void {
    const query = (event.target as HTMLInputElement).value;
    this.searchSubject.next(query);
  }
}
