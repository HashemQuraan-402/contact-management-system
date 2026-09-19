import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { TalkToApi } from './talk-to-api';

describe('TalkToApi', () => {
  let service: TalkToApi;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(TalkToApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

