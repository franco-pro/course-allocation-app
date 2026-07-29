import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentProposal } from './assignment-proposal';

describe('AssignmentProposal', () => {
  let component: AssignmentProposal;
  let fixture: ComponentFixture<AssignmentProposal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignmentProposal],
    }).compileComponents();

    fixture = TestBed.createComponent(AssignmentProposal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
