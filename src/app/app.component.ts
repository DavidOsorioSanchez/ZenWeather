import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BonsaiComponent } from './components/bonsai/bonsai.component';
import { CloudsComponent } from './components/clouds/clouds.component';
import { ApiWeatherService } from './service/api/api-weather.service';
import { WeatherData } from '../util/interface';
import { CommonModule } from '@angular/common';
import { mainlyUseCloudConditional } from '../util/magicValues';


@Component({
  selector: 'app-root',
  // standalone: true,
  imports: [RouterOutlet, BonsaiComponent, CloudsComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ZenWeather';

  
  public latitud: number | undefined;
  public longitud: number | undefined;
  temperatures: number[] | undefined;
  isDay: number = 0 | 1;
  datos: WeatherData | undefined;
  weather_code: number = 0;
  rain : number = 0;
  snow : number = 0;
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
          this.getWeatherData();
        },(error) => {
          this.error = error.message;
        }
    );}else {
      this.error = 'Geolocalización no soportada';
    }
  }

  getWeatherData() {
    if (this.latitud !== undefined || this.longitud !== undefined) {
      this.apiWeatherService.GetBonsaiData(this.latitud, this.longitud ).subscribe(
        (response: Object) => {
          console.log('bonsai data:', response);
          this.datos = response as WeatherData;
          this.isDay = this.datos.current.is_day;
          this.weather_code = this.datos.current.weather_code;
          this.rain = this.datos.current.rain;
          this.snow = this.datos.current.snowfall;

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

  

  mainlyUseClouds() {
      for(let i = 0; i < mainlyUseCloudConditional.length; i++) {
        if(this.weather_code === mainlyUseCloudConditional[i]){
          return true;
        } 
      }
      return false;
  }
}
