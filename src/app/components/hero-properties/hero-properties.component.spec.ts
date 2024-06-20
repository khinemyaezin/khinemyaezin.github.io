import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroPropertiesComponent } from './hero-properties.component';

describe('HeroPropertiesComponent', () => {
  let component: HeroPropertiesComponent;
  let fixture: ComponentFixture<HeroPropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroPropertiesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeroPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
