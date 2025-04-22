import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherData } from '../../../util/interface';

@Injectable({
  providedIn: 'root'
})
export class ApiWeatherService {

  constructor(private http: HttpClient) { }
  
  GetWeatherData(latitud: number | undefined, longitud: number | undefined): Observable<Object> {
    return this.http.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitud}&longitude=${longitud}&daily=daylight_duration,wind_direction_10m_dominant,rain_sum&hourly=visibility,temperature_2m&current=is_day,showers,cloud_cover,wind_speed_10m,snowfall,wind_direction_10m,rain,weather_code,wind_gusts_10m&timezone=auto&forecast_days=1`);
  }
  
}
