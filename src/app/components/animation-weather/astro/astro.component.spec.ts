import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AstroComponent } from './astro.component';

describe('AstroComponent', () => {
  let component: AstroComponent;
  let fixture: ComponentFixture<AstroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AstroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AstroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
