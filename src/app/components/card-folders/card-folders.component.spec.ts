import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFoldersComponent } from './card-folders.component';

describe('CardFoldersComponent', () => {
  let component: CardFoldersComponent;
  let fixture: ComponentFixture<CardFoldersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardFoldersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardFoldersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
