import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IContact } from '../../../common/interfaces/contact.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from '../../../common/services/contacts.service';
import { GenderEnum } from '../../../common/enums/gender.enum';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  public form: FormGroup = new FormGroup({});
  private id: string | null = null;
  public readonly GenderEnum = GenderEnum;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly contactService: ContactsService
  ) {
    this.id = atob(this.route.snapshot.paramMap.get('id') || '');
  }

  ngOnInit(): void {
    this.form = this.contactFormInit();
    this.initContactForm();
  }

  private contactFormInit(): FormGroup {
    return this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      surname: [''],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      birthdate: ['', [Validators.required]],
      address: ['', [Validators.required]],
      gender: ['', [Validators.required]],
    });
  }

  private initContactForm(): void {
    if (this.id) {
      let contact = this.contactService.getById(this.id);
      if (contact) this.form.patchValue(contact);
    }
  }

  public onSubmit(event: Event): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    !this.id
      ? this.contactService.save(this.form.value)
      : this.contactService.update(this.id, this.form.value);

    this.router.navigate(['/list']);
    this.form.reset();
  }
}
