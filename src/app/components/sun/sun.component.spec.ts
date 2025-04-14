import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SunComponent } from './sun.component';

describe('SunComponent', () => {
  let component: SunComponent;
  let fixture: ComponentFixture<SunComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SunComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
