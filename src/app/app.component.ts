import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BonsaiComponent } from './components/bonsai/bonsai.component';
import { CloudsComponent } from './components/clouds/clouds.component';
import { ApiWeatherService } from './service/api/api-weather.service';
import { WeatherData } from '../util/interface';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BonsaiComponent, CloudsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ZenWeather';

  
  public latitud: number | undefined;
  public longitud: number | undefined;
  temperatures: number[] | undefined;
  isDay: number = 0 | 1;
  rain: number = 0 ;
  datos: WeatherData | undefined;
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
          this.rain = this.datos.current.rain;
          this.setBackground();
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

  setBackground() {
      // if (this.datos && this.datos.current.rain > 0 ) {
      //   return this.background = "bg-rain";
      // }
      // else if (this.datos && this.datos.current.snowfall > 0) {
      //   return this.background = "bg-snow";
      // }
      // else if (this.datos && this.datos.current.showers > 0 ){
      //   return this.background = "bg-showers";
      // }
      // else if (this.datos && this.datos.current.rain <= 0 && this.datos.current.snowfall <= 0 && this.datos.current.showers <= 0){
      //   return this.background = "bg-none";
      // } else {
      //   this.background = "bg-none";
      //   return console.error('No se ha encontrado ninguna condición para establecer el fondo del componente');
      // }
      if (this.datos && this.datos.current.rain > 0) {
        // this.animacionLluvia();
      }
      
  }

  
}
