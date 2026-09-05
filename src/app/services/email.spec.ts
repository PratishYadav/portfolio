import { TestBed } from '@angular/core/testing';

import { Email } from './email';

describe('Email', () => {
  let service: Email;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Email);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
