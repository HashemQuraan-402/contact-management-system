import { Component } from '@angular/core';
import { Observable, startWith, Subject, switchMap } from 'rxjs';

import { Contact, ContactInput } from '../Models/Contact';
import { ContactsForm } from './components/contacts-form/contacts-form';
import { ContactsInformation } from './components/contacts-information/contacts-information';
import { TalkToApi } from './services/talk-to-api';

@Component({
  selector: 'app-root',
  imports: [ContactsForm, ContactsInformation],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly refresh$ = new Subject<void>();

  readonly contacts$: Observable<Contact[]> = this.refresh$.pipe(
    startWith(undefined),
    switchMap(() => this.apiService.getAllContacts()),
  );

  selectedContact: Contact | null = null;
  statusMessage = '';
  errorMessage = '';

  constructor(private readonly apiService: TalkToApi) {}

  onSaveContact(contact: ContactInput): void {
    this.clearMessages();

    if (this.selectedContact) {
      const id = this.selectedContact.id;
      this.apiService.updateContact(id, contact).subscribe({
        next: () => {
          this.selectedContact = null;
          this.statusMessage = 'Contact updated successfully.';
          this.refresh$.next();
        },
        error: () => this.errorMessage = 'The contact could not be updated. Check that the API is running.',
      });
      return;
    }

    this.apiService.createContact(contact).subscribe({
      next: () => {
        this.statusMessage = 'Contact added successfully.';
        this.refresh$.next();
      },
      error: () => this.errorMessage = 'The contact could not be added. Check that the API is running.',
    });
  }

  onEditContact(contact: Contact): void {
    this.clearMessages();
    this.selectedContact = contact;
  }

  onCancelEdit(): void {
    this.selectedContact = null;
  }

  onDeleteContact(contact: Contact): void {
    const confirmed = window.confirm(`Delete ${contact.name}?`);
    if (!confirmed) {
      return;
    }

    this.clearMessages();
    this.apiService.deleteContactById(contact.id).subscribe({
      next: () => {
        if (this.selectedContact?.id === contact.id) {
          this.selectedContact = null;
        }
        this.statusMessage = 'Contact deleted successfully.';
        this.refresh$.next();
      },
      error: () => this.errorMessage = 'The contact could not be deleted. Check that the API is running.',
    });
  }

  private clearMessages(): void {
    this.statusMessage = '';
    this.errorMessage = '';
  }
}

