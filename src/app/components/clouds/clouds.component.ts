import { Component, ElementRef, Input, ViewChild, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-clouds',
  imports: [],
  templateUrl: './clouds.component.html',
  styleUrl: './clouds.component.css'
})
export class CloudsComponent {
  constructor(private renderer: Renderer2) {}

  @Input () weather_code: number = 0;
  @Input () nieve: number = 0;
  @Input () lluvia: number = 0;
  @Input () llovisna: number = 0;
  
  @ViewChild('startWeatherAnimation', { static: true }) startWeatherAnimation: ElementRef | undefined;
  @ViewChild('clouds', { static: true }) clouds: ElementRef | undefined;

  

  ngAfterViewInit() {
    if(this.lluvia > 0 || this.llovisna > 0) {
      this.animacionLluvia();
    }

    if(this.nieve > 0) {
      this.animacionNieve();
    }
  }


  
  animacionNieve() {
    if (typeof document !== 'undefined') {
      setInterval(() => {
        this.snow();
      }, 2000);
    }
  }

  snow() {

  }

  animacionLluvia() {
    if(this.weather_code === 95 || this.weather_code === 96 || this.weather_code === 99){
      if(this.clouds){
        this.renderer.addClass(this.clouds.nativeElement, 'thunderStatus');
      }else{
        console.error('clouds no encontrado');
      }
    }

    if (typeof document !== 'undefined') {
      setInterval(() => {
        this.rain();
      }, 200);
    }
  }

  rain() {
    if (this.startWeatherAnimation) {
      const drop = this.renderer.createElement('div');
      this.renderer.addClass(drop, 'drop');
      this.renderer.setStyle(drop, 'left', Math.floor(Math.random() * 160) + 'px');
      this.renderer.appendChild(this.startWeatherAnimation.nativeElement, drop)

      setTimeout(() =>{
        if (this.startWeatherAnimation) {
          this.startWeatherAnimation.nativeElement.removeChild(drop);
        }
      }, 2000);
    }
  }
}
