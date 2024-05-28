import { TestBed } from '@angular/core/testing';

import { MailersendserviceService } from './mailersendservice.service';

describe('MailersendserviceService', () => {
  let service: MailersendserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MailersendserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
