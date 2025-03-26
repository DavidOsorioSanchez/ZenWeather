import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloudsComponent } from './clouds.component';

describe('CloudsComponent', () => {
  let component: CloudsComponent;
  let fixture: ComponentFixture<CloudsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CloudsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CloudsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // testing propio
  it('El objeto clouds debe existir', () => {
    fixture = TestBed.createComponent(CloudsComponent);
    component = fixture.componentInstance;
    expect(component.clouds).toBeDefined();
  });

  it('El objeto startWeatherAnimation debe existir', () => {
    fixture = TestBed.createComponent(CloudsComponent);
    component = fixture.componentInstance;
    expect(component.startWeatherAnimation).toBeDefined();
  });

  it('El valor de weather_code debe ser menor que 100', () => {
    fixture = TestBed.createComponent(CloudsComponent);
    component = fixture.componentInstance;
    expect(component.weather_code).toBeLessThan(100);
  });

  it ('El valor de nieve debe ser menor que 10', () => {
    fixture = TestBed.createComponent(CloudsComponent);
    component = fixture.componentInstance;
    expect(component.nieve).toBeLessThan(10);
  });

  it ('El valor de lluvia debe ser menor que 10', () => {
    fixture = TestBed.createComponent(CloudsComponent);
    component = fixture.componentInstance;
    expect(component.lluvia).toBeLessThan(10);
  });

});
