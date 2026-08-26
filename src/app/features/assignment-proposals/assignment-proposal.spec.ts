import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentProposalComponent } from './assignment-proposal';

describe('AssignmentProposal', () => {
  let component: AssignmentProposalComponent;
  let fixture: ComponentFixture<AssignmentProposalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignmentProposalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AssignmentProposalComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
