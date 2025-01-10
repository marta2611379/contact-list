import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from '../../../common/services/contacts.service';
import { GenderEnum } from '../../../common/enums/gender.enum';
import { CommonModule } from '@angular/common';
import { emailValidator } from '../../../common/validators/email.validator';
import { FormErrorsComponent } from '../../../common/components/form-errors/form-errors.component';
import { phoneValidator } from '../../../common/validators/phone.validator';
import { birthDateValidator } from '../../../common/validators/birthdate.validator';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule, CommonModule, FormErrorsComponent],
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
      firstname: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      surname: ['', [Validators.minLength(2)]],
      email: ['', [Validators.required, emailValidator]],
      phone: ['', [Validators.required, phoneValidator]],
      birthdate: ['', [Validators.required, birthDateValidator]],
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

  public onSubmit(): void {
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

  public get firstname(): FormControl {
    return this.form.get('firstname') as FormControl;
  }

  public get lastname(): FormControl {
    return this.form.get('lastname') as FormControl;
  }

  public get surname(): FormControl {
    return this.form.get('surname') as FormControl;
  }

  public get phone(): FormControl {
    return this.form.get('phone') as FormControl;
  }

  public get birthdate(): FormControl {
    return this.form.get('birthdate') as FormControl;
  }

  public get address(): FormControl {
    return this.form.get('address') as FormControl;
  }

  public get gender(): FormControl {
    return this.form.get('gender') as FormControl;
  }

  public get email(): FormControl {
    return this.form.get('email') as FormControl;
  }
}
