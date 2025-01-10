import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-errors',
  imports: [],
  templateUrl: './form-errors.component.html',
  styleUrl: './form-errors.component.scss',
})

export class FormErrorsComponent {
  @Input({ required: true }) control!: FormControl;
}
