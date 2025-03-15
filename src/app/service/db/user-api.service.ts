import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface UserData {
  id: string;
  Location: string;
}

@Injectable({
  providedIn: 'root'
})

export class UserApiService {

  constructor(private http: HttpClient) { }

  private baseUrlUser: string =  environment.API_USER;
  
  
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
