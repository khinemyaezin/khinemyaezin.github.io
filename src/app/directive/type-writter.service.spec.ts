import { TestBed } from '@angular/core/testing';

import { TypeWritterService } from './type-writter.service';

describe('TypeWritterService', () => {
  let service: TypeWritterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeWritterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
