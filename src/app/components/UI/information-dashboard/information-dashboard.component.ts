import { Component, Input, OnInit } from '@angular/core';
import { WeatherData } from '../../../../util/interface';

@Component({
  selector: 'app-information-dashboard',
  imports: [],
  templateUrl: './information-dashboard.component.html',
  styleUrl: './information-dashboard.component.css'
})
export class InformationDashboardComponent implements OnInit {
  @Input() datos: WeatherData | undefined;
  isDay : number = 0 | 1;

  ngOnInit(): void {
    
  }

  ordenarDatos(){
    if(this.datos){
      this.isDay = this.datos.current.is_day;
    }
  }
}
