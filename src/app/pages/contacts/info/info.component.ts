import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IContact } from '../../../common/interfaces/contact.interface';
import { ContactsService } from '../../../common/services/contacts.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-info',
  imports: [CommonModule],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss',
})
export class InfoComponent {
  private id: string | null = null;
  public contact: IContact | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly contactService: ContactsService
  ) {
    this.id = atob(this.route.snapshot.paramMap.get('id') || '');
  }

  ngOnInit(): void {
    if (this.id) this.contact = this.contactService.getById(this.id);
  }
}
