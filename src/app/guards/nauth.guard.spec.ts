import { TestBed, async, inject } from '@angular/core/testing';

import { NAuthGuard } from './nauth.guard';

describe('NAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NAuthGuard]
    });
  });

  it('should ...', inject([NAuthGuard], (guard: NAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
