import { Component, HostListener } from '@angular/core';
import { IContact } from '../../../common/interfaces/contact.interface';
import { Router } from '@angular/router';
import { ContactsService } from '../../../common/services/contacts.service';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ThreeDotsMenuComponent } from './three-dots-menu/three-dots-menu.component';

@Component({
  selector: 'app-list',
  imports: [CommonModule, ThreeDotsMenuComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  public filteredContacts: IContact[] = [];
  private searchSubject = new Subject<string>();
  public activeMenu: number | null = null;

  @HostListener('document:click')
  onDocumentClick(): void {
    this.activeMenu = null;
  }

  constructor(
    private readonly router: Router,
    private readonly contactService: ContactsService
  ) {}

  ngOnInit(): void {
    this.filteredContacts = this.contactService.get();
    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((query) => {
        this.filteredContacts = this.contactService.search(query);
      });
  }

  public onMenuOpened(menuId: number | null): void {
    this.activeMenu = menuId;
  }

  public init(): void {
    this.contactService.initContacts();
    this.filteredContacts = this.contactService.get();
    this.searchSubject.next('');
  }

  public remove(id: string): void {
    if (confirm('Ви дійсно бажаєте видалити контакт?')) {
      this.contactService.remove(id);
      this.filteredContacts = this.contactService.get();
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
