import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiRequestService } from './service/api-request.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ZenWeather';

  // datos de la API de OpenWeather
  constructor(private apiRequestService: ApiRequestService) { }
  
  latitud: number | undefined;
  longitud: number | undefined;
  error: string | undefined;
  datos: any;
  currentTime: string = "";

  ngOnInit() {

    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(
    //     (posicion) => {
          // this.latitud = posicion.coords.latitude;
          // this.longitud = posicion.coords.longitude;
          // console.log('Latitud:', this.latitud);
          // console.log('Longitud:', this.longitud);
          this.apiRequestService.GetWeatherData("Londres").subscribe(
            (response) => {
              console.log('Weather data:', response);
              this.datos = response;
              this.currentTime = response.data.current_condition[0].observation_time;
            },
            (error) => {
              console.error('Error fetching weather data:', error);
            }
          );
  //       },
  //       (error) => {
  //         this.error = error.message;
  //       }
  //     );
  //   } else {
  //     this.error = 'La geolocalización no es compatible con este navegador.';
  //   }
  }

}
