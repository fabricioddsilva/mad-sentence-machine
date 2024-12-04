import { TestBed } from '@angular/core/testing';

import { HtmlDecodeService } from './html-decode.service';

describe('HtmlDecodeService', () => {
  let service: HtmlDecodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HtmlDecodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
