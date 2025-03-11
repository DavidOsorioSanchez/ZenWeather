import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment';


interface UserData {
  id: string;
  Location: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {



  // getCurrentLocation(): void {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position: GeolocationPosition) => {
  //         const latitud = position.coords.latitude;
  //         const longitud = position.coords.longitude;
  //         // Utiliza latitud y longitud aquí
  //         this.GetWeatherData({ lat: latitud, lon: longitud, part: 'minutely,hourly' }).subscribe(
  //           (data) => {
  //             console.log('Weather data:', data);
  //           },
  //           (error) => {
  //             console.error('Error fetching weather data:', error);
  //           }
  //         );
  //       },
  //       (error: GeolocationPositionError) => {
  //         // Manejar el error de geolocalización
  //         console.error("Error al obtener la geolocalización:", error);
  //       }
  //     );
  //   } else {
  //     console.error("Geolocalización no soportada");
  //   }
  // }

  private baseUrlUser = environment.URL_USER;
  // this.http.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitud}&lon=${longitud}&exclude={part}&appid=${environment.APPID_WEATHER}`)
            
  constructor(private http: HttpClient) { }

  // estos son los metodos http de la API de worldweather
  GetWeatherData(ciudad: string | undefined): Observable<any> {
    return this.http.get(`http://api.worldweatheronline.com/premium/v1/weather.ashx?key=${environment.APPID_WEATHER}&q=${ciudad}&format=json`);
  }

  // estos son los metodos http de la API de googlemaps

  // GetDirections(latitud: number, longitud: number): Observable<any> {
  //   return this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?lat=${latitud}&lng=${longitud}`);
  // }

  // estos son los  metodos http de usuario
  GetUserData(idUsuario: number): Observable<UserData> {
    return this.http.get<UserData>(`${this.baseUrlUser}/user/${idUsuario}`);
  }

  CreateUser(datosUsuario: UserData): Observable<UserData> {
    return this.http.post<UserData>(`${this.baseUrlUser}/user`, datosUsuario);
  }

  UpdateUser(idUsuario: number, datosUsuario: UserData): Observable<UserData> {
    return this.http.put<UserData>(`${this.baseUrlUser}/user/${idUsuario}`, datosUsuario);
  }

  DeleteUser(idUsuario: number): Observable<any> {
    return this.http.delete(`${this.baseUrlUser}/user/${idUsuario}`);
  }
}
