import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BonsaiComponent } from './components/bonsai/bonsai.component';
import { ApiWeatherService } from './service/api/api-weather.service';
import { WeatherData } from './util/interface';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BonsaiComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ZenWeather';

  
  public latitud: number | undefined;
  public longitud: number | undefined;
  temperatures: number[] | undefined;
  datos: WeatherData | undefined;
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
          console.log('latitude:', this.latitud);
          console.log('longitude:', this.longitud);
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
}
