import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheSuivie } from './fiche-suivie';

describe('FicheSuivie', () => {
  let component: FicheSuivie;
  let fixture: ComponentFixture<FicheSuivie>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FicheSuivie],
    }).compileComponents();

    fixture = TestBed.createComponent(FicheSuivie);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
