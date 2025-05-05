import { Component, Input, SimpleChanges, ViewChild, ElementRef, Renderer2, } from '@angular/core';
import { WeatherData } from '../../../../util/interface';
import { MinLlovisnaAnimations, MinLluviaAnimations, MinNieveAnimations, MinVientoAnimations } from '../../../../util/magicValues';

@Component({
  selector: 'app-bonsai',
  imports: [],
  templateUrl: './bonsai.component.html',
  styleUrl: './bonsai.component.css'
})
export class BonsaiComponent {
  constructor(private renderer: Renderer2) { }

  @ViewChild('leaf', { static: true }) leaf: ElementRef | undefined;

  @Input() datos: WeatherData | undefined;
  @Input() mainlyUseLeafAnimation: boolean = false;

  isDay: number = 0 | 1;
  hora: number = 0;
  temperatures: number[] = [0];
  wind_speed_10m: number = 0;
  wind_speed_10m_unit: string = "km/h";



  ngOnInit() {
    this.getHour();    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['datos'] && this.datos) {
      this.temperatures = this.datos.hourly.temperature_2m;
      this.wind_speed_10m = this.datos.current.wind_speed_10m;
      this.wind_speed_10m_unit = this.datos.current_units.wind_speed_10m;
      this.isDay = this.datos.current.is_day;

      if(
        this.wind_speed_10m >= MinVientoAnimations && 
        this.datos.current.rain === MinLluviaAnimations &&
        this.datos.current.showers <= MinLlovisnaAnimations && 
        this.datos.current.snowfall === MinNieveAnimations
      ) {
        this.animacionDeHojas();
      }
    }
  }

  getHour() {
    const ahora = new Date();
    this.hora = ahora.getHours();
  }

  animacionDeHojas() {
    if (typeof document !== 'undefined') {
      setInterval(() => {
        this.leafDown();
      }, 3500);
    }
  }

  leafDown() {
    if (this.leaf) {
      const leaf = this.renderer.createElement('div');
      this.renderer.addClass(leaf, 'leafDown');
      this.renderer.appendChild(this.leaf.nativeElement, leaf);
      this.renderer.setStyle(leaf, 'left', Math.floor(Math.random() * 230) + 30 + 'px');
      setTimeout(() =>{
        if (this.leaf) {
          this.leaf.nativeElement.removeChild(leaf);
        }
      }, 7000);
    }
  }
}


