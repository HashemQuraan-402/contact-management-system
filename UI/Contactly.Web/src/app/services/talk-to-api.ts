import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Contact, ContactInput } from '../../Models/Contact';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TalkToApi {
  private readonly http = inject(HttpClient);
  private readonly contactsUrl = `${environment.apiUrl}/Contacts`;

  getAllContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.contactsUrl);
  }

  createContact(contact: ContactInput): Observable<Contact> {
    return this.http.post<Contact>(this.contactsUrl, contact);
  }

  updateContact(id: string, contact: ContactInput): Observable<void> {
    return this.http.put<void>(`${this.contactsUrl}/${id}`, contact);
  }

  deleteContactById(id: string): Observable<void> {
    return this.http.delete<void>(`${this.contactsUrl}/${id}`);
  }
}

