import { Component, ViewChild } from '@angular/core';
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

  latitud: number | undefined;
  longitud: number | undefined;
  cordenada: string | undefined;
  error: string | undefined;
  datos: any;

  // @ViewChild(ModalComponent) modal: ModalComponent | undefined;


  // esta funcion comprueba si hay datos en localStorage


  // datos de la API de OpenWeather
  constructor(private apiRequestService: ApiRequestService) { }


  ngOnInit() {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (posicion) => {
          this.latitud = posicion.coords.latitude;
          this.longitud = posicion.coords.longitude;
          console.log('Latitud:', this.latitud);
          console.log('Longitud:', this.longitud);
          
        },(error) => {
          this.error = error.message;
        }
    );}
  
    if (this.latitud !== undefined && this.longitud !== undefined) {
      this.apiRequestService.GetWeatherData(this.latitud, this.longitud ).subscribe(
        (response) => {
          console.log('Weather data:', response);
          this.datos = response;
        },
        (error) => {
          console.error('Error fetching weather data:', error);
        }
      );
    } if (this.latitud === undefined) {
      console.error('Latitud is undefined');
    } if (this.longitud === undefined) {
      console.error('Longitud is undefined');
    }
  }
}
