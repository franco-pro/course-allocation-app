import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingValidations } from './pending-validations';

describe('PendingValidations', () => {
  let component: PendingValidations;
  let fixture: ComponentFixture<PendingValidations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingValidations],
    }).compileComponents();

    fixture = TestBed.createComponent(PendingValidations);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
