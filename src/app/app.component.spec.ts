import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('Se debe crear la aplicacion', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`se debe tener el titulo de "ZenWeather"`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('ZenWeather');
  });

  it('se debe cargar el titulo', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, ZenWeather');
  });

  it('debe llamar a getUserLocation al inicializar el componente', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    spyOn(app, 'getUserLocation');
    app.ngOnInit();
    expect(app.getUserLocation).toHaveBeenCalled();
  });

  it('debe verificar correctamente si el clima es principalmente nublado', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    spyOnProperty(app, 'weather_code', 'get').and.returnValue(3);
    expect(app.mainlyUseClouds()).toBeTrue();
    spyOnProperty(app, 'weather_code', 'get').and.returnValue(0);
    expect(app.mainlyUseClouds()).toBeFalse();
  });

});
