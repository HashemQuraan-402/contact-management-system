import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Contact, ContactInput } from '../../../Models/Contact';

@Component({
  selector: 'app-contacts-form',
  imports: [ReactiveFormsModule],
  templateUrl: './contacts-form.html',
  styleUrl: './contacts-form.css',
})
export class ContactsForm {
  private editingContact: Contact | null = null;

  @Input()
  set contact(value: Contact | null) {
    this.editingContact = value;
    this.contactsForm.reset({
      name: value?.name ?? '',
      email: value?.email ?? '',
      phone: value?.phone ?? '',
      favorite: value?.favorite ?? false,
    });
  }

  get contact(): Contact | null {
    return this.editingContact;
  }

  @Output() saveContact = new EventEmitter<ContactInput>();
  @Output() cancelEdit = new EventEmitter<void>();

  readonly contactsForm = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(50)],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.email, Validators.maxLength(150)],
    }),
    phone: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(15)],
    }),
    favorite: new FormControl(false, { nonNullable: true }),
  });

  onFormSubmit(): void {
    if (this.contactsForm.invalid) {
      this.contactsForm.markAllAsTouched();
      return;
    }

    const value = this.contactsForm.getRawValue();
    this.saveContact.emit({
      name: value.name.trim(),
      email: value.email.trim() || null,
      phone: value.phone.trim(),
      favorite: value.favorite,
    });

    if (!this.editingContact) {
      this.resetForm();
    }
  }

  onCancel(): void {
    this.resetForm();
    this.cancelEdit.emit();
  }

  private resetForm(): void {
    this.editingContact = null;
    this.contactsForm.reset({
      name: '',
      email: '',
      phone: '',
      favorite: false,
    });
  }
}

