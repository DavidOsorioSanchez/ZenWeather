import { Component, Input, SimpleChanges, ViewChild, ElementRef, } from '@angular/core';
import { WeatherData } from '../../../util/interface';

@Component({
  selector: 'app-bonsai',
  imports: [],
  templateUrl: './bonsai.component.html',
  styleUrl: './bonsai.component.css'
})
export class BonsaiComponent {
  @Input() datos: WeatherData | undefined;
  @Input() identificador: any;

  isDay: number = 0 | 1;
  hora: number = 0;
  temperatures: number[] = [0];
  wind_speed_10m: number = 0;
  wind_speed_10m_unit: string = "km/h";

  
  ngOnInit() {
    this.getHour();
    
    // this.animacionDeHojas();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['datos'] && this.datos) {
      this.temperatures = this.datos.hourly.temperature_2m;
      this.wind_speed_10m = this.datos.current.wind_speed_10m;
      this.wind_speed_10m_unit = this.datos.current_units.wind_speed_10m;
      this.isDay = this.datos.current.is_day;
    }
  }

  getHour() {
    const ahora = new Date();
    this.hora = ahora.getHours();
  }

  

}


