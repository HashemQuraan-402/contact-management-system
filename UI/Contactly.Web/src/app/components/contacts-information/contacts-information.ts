import { AsyncPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';

import { Contact } from '../../../Models/Contact';

@Component({
  selector: 'app-contacts-information',
  imports: [AsyncPipe],
  templateUrl: './contacts-information.html',
  styleUrl: './contacts-information.css',
})
export class ContactsInformation {
  @Input({ required: true }) contactsList$!: Observable<Contact[]>;
  @Output() editContact = new EventEmitter<Contact>();
  @Output() deleteContact = new EventEmitter<Contact>();
}

