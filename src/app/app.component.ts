import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BonsaiComponent } from './components/bonsai/bonsai.component';
import { CloudsComponent } from './components/clouds/clouds.component';
import { ApiWeatherService } from './service/api/api-weather.service';
import { WeatherData } from '../util/interface';
import { CommonModule } from '@angular/common';
import { mainlyUseCloudConditional } from '../util/magicValues';
import { ModalLocationComponent } from "./components/modal-location/modal-location.component";
import { AstroComponent } from "./components/astro/astro.component";
// import { MenuButtonComponent } from './components/menu-button/menu-button.component';


@Component({
  selector: 'app-root',
  // standalone: true,
  imports: [
      RouterOutlet,
      BonsaiComponent, 
      CloudsComponent, 
      CommonModule, 
      ModalLocationComponent, 
      AstroComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ZenWeather';

  
  public latitud: number | undefined;
  public longitud: number | undefined;
  public modal: boolean = false;
  temperatures: number[] | undefined;
  isDay: number = 0 | 1;
  datos: WeatherData | undefined;
  weather_code: number = 0;
  rain : number = 0;
  snow : number = 0;
  showers: number = 0;
  // background: string = "";
  error: any;


  constructor(private apiWeatherService: ApiWeatherService) { }

  ngOnInit() {
    this.getUserLocation();
    
  }

  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (posicion) => {
          this.latitud = posicion.coords.latitude;
          this.longitud = posicion.coords.longitude;
          this.modal = false;     
          this.getWeatherData();
          this.guardadoLocalstorage();
        },(error) => {
          this.modal = true;
          this.error = error.message;
        });
    }else {
      this.modal = true;
      this.error = 'Geolocalización no soportada';
    }
  }

  getWeatherData() {
    if (this.latitud !== undefined || this.longitud !== undefined) {
      this.apiWeatherService.GetWeatherData(this.latitud, this.longitud ).subscribe(
        (response: Object) => {
          console.log('bonsai data:', response);
          this.datos = response as WeatherData;
          this.isDay = this.datos.current.is_day;
          this.weather_code = this.datos.current.weather_code;
          this.rain = this.datos.current.rain;
          this.snow = this.datos.current.snowfall;
          this.showers = this.datos.current.showers;

          this.mainlyUseClouds();
        },
        (error : GeolocationPositionError) => {
          this.handleGeolocationError(error as GeolocationPositionError);
        }
      );
    } else {
      console.error('Geolocalización no soportada');
    }
  }

  modalControlador(valor: boolean) {
    this.modal = valor;
  }
  
  guardadoLocalstorage(){
    if (this.latitud !== undefined && this.longitud !== undefined) {
      localStorage.setItem('lat&lon', JSON.stringify({lat: this.latitud, lon: this.longitud}));
    }
  }
  
  handleGeolocationError(error: GeolocationPositionError) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        this.error = 'User denied the request for Geolocation.';
        break;
      case error.POSITION_UNAVAILABLE:
        this.error = 'Location information is unavailable.';
        break;
      case error.TIMEOUT:
        this.error = 'The request to get user location timed out.';
        break;
    }
    console.error('Geolocation error:', this.error);
  }

  backgroundColor(){
    if(this.isDay === 1){
      if(this.weather_code === 0){
        return "bg-[#00BFFF]";
      } else if(this.weather_code === 1 || 2 || 66){
        return "bg-[#89CFF0]";
      } else if(this.weather_code === 3 || 4 || 67 || 80 || 81){
        return "bg-[#A9A9A9]";
      } else if( this.weather_code === 82 ){
        return "bg-[#5238c2]";
      } else if(this.weather_code === 85 || 86 ){
        return "bg-[#dadada]";
      } else if(this.weather_code === 95 || 96 || 99){
        return "bg-gray-600";
      }else return "bg-white";
    } else {
      return "bg-gray-700";
    }
    // nublado = 3,
    // lluvia ligera = 66,
    // lluvia fuerte = 67,
    // nieve = 77,
    // chuvasco leve = 80,
    // chuvasco moderado = 81,
    // chuvasco violento = 82,
    // nevada ligera = 85,
    // nevada fuerte  = 86,
    // lluvia con truenos leve o moderado = 95,
    // truenos con granizo leve = 96,
    // truenos con granizo fuerte = 99,
  }

  mainlyUseClouds() {
      for(let i = 0; i < mainlyUseCloudConditional.length; i++) {
        if(this.weather_code === mainlyUseCloudConditional[i]){
          return true;
        } 
      }
      return false;
  }
}
