import { Component, Input, SimpleChanges } from '@angular/core';
import { WeatherData } from '../../util/interface';

@Component({
  selector: 'app-bonsai',
  imports: [],
  templateUrl: './bonsai.component.html',
  styleUrl: './bonsai.component.css'
})
export class BonsaiComponent {
  @Input() datos: WeatherData | undefined;

  temperatures: number[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['datos'] && this.datos) {
      this.temperatures = this.datos.hourly.temperature_2m;
    }else{
      this.temperatures = [0];
    }
  }
}
