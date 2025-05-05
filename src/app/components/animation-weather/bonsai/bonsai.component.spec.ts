import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonsaiComponent } from './bonsai.component';

describe('BonsaiComponent', () => {
  let component: BonsaiComponent;
  let fixture: ComponentFixture<BonsaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BonsaiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BonsaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // test propio
  it('El valor de Calor debe ser menor que 70', () => {
    fixture = TestBed.createComponent(BonsaiComponent);
    component = fixture.componentInstance;
    expect(component.temperatures).toBeLessThan(70);
  });

  it('El valor de isDay debe ser menor o igual a 1', () => {
    fixture = TestBed.createComponent(BonsaiComponent);
    component = fixture.componentInstance;
    expect(component.isDay).toBeLessThanOrEqual(1);
  });
});
