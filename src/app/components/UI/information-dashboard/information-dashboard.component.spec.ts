import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationDashboardComponent } from './information-dashboard.component';

describe('InformationDashboardComponent', () => {
  let component: InformationDashboardComponent;
  let fixture: ComponentFixture<InformationDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformationDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformationDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
