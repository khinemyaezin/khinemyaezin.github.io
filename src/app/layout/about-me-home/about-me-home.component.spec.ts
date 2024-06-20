import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutMeHomeComponent } from './about-me-home.component';

describe('AboutMeHomeComponent', () => {
  let component: AboutMeHomeComponent;
  let fixture: ComponentFixture<AboutMeHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutMeHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AboutMeHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
