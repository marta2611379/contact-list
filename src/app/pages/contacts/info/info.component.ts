import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IContact } from '../../../common/interfaces/contact.interface';
import { ContactsService } from '../../../common/services/contacts.service';
import { CommonModule } from '@angular/common';
import { EnumPipe } from '../../../common/pipes/enum.pipe';
import { GenderEnum } from '../../../common/enums/gender.enum';

@Component({
  selector: 'app-info',
  imports: [CommonModule, EnumPipe],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss',
})
export class InfoComponent {
  private id: string | null = null;
  public contact: IContact | null = null;
  public readonly GenderEnum = GenderEnum;
  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly contactService: ContactsService
  ) {
    this.id = atob(this.route.snapshot.paramMap.get('id') || '');
  }

  ngOnInit(): void {
    if (this.id) this.contact = this.contactService.getById(this.id);
  }

  public edit(id: string): void {
    this.router.navigate(['/edit', btoa(id)]);
  }
}
