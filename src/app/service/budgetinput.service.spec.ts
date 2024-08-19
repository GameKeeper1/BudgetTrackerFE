import { TestBed } from '@angular/core/testing';

import { BudgetinputService } from './budgetinput.service';

describe('BudgetinputService', () => {
  let service: BudgetinputService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BudgetinputService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
