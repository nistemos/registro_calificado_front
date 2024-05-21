import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramYearComponent } from './program-year.component';

describe('ProgramYearComponent', () => {
  let component: ProgramYearComponent;
  let fixture: ComponentFixture<ProgramYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgramYearComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProgramYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
