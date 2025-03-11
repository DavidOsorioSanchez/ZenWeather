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
  
  ngOnInit() {
    this.apiRequestService.GetWeatherData("Londres").subscribe(
      (data) => {
        console.log('Weather data:', data);
      },
      (error) => {
        console.error('Error fetching weather data:', error);
      }
    );
  }

  

}
