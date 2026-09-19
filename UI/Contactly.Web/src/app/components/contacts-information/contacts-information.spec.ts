import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ContactsInformation } from './contacts-information';

describe('ContactsInformation', () => {
  let component: ContactsInformation;
  let fixture: ComponentFixture<ContactsInformation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactsInformation],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactsInformation);
    component = fixture.componentInstance;
    component.contactsList$ = of([]);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

