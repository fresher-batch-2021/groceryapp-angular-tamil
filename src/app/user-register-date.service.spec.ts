import { TestBed } from '@angular/core/testing';

import { UserRegisterDateService } from './user-register-date.service';

describe('UserRegisterDateService', () => {
  let service: UserRegisterDateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserRegisterDateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
