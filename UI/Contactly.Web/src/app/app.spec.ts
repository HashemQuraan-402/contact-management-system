import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { App } from './app';
import { TalkToApi } from './services/talk-to-api';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [{
        provide: TalkToApi,
        useValue: {
          getAllContacts: () => of([]),
          createContact: () => of({}),
          updateContact: () => of(undefined),
          deleteContactById: () => of(undefined),
        },
      }],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the Contacts heading', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Contacts');
  });
});

