import { Component, ElementRef, Input, ViewChild, Renderer2 } from '@angular/core';
import { mainlyUseThunderConditional, MinLlovisnaAnimations, MinLluviaAnimations, MinNieveAnimations } from '../../../../util/magicValues';

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
    if(this.lluvia > MinLluviaAnimations || this.llovisna > MinLlovisnaAnimations) {
      if(this.lluvia >= this.llovisna ) {
        this.animacionLluvia(true);
      }else{
        this.animacionLluvia(false);
      }
    }

    if(this.nieve > MinNieveAnimations) {
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

  animacionLluvia(EsLluvia: boolean) {
    
    for(let i = 0; i < mainlyUseThunderConditional.length; i++) {
      if(this.weather_code === mainlyUseThunderConditional[i]){
        if(this.clouds){
          this.renderer.addClass(this.clouds.nativeElement, 'thunderStatus');
          break;
        }else{
          console.error('clouds no encontrado');
        } 
      }
    }
      

    if (typeof document !== 'undefined') {
      if(EsLluvia) {
        setInterval(() => {
          this.rain(true);
        }, 200);
      }else{
        setInterval(() => {
          this.rain(false);
        }, 2000);
      }
      
    }
  }

  rain(EsLluvia: boolean) {
    if (this.startWeatherAnimation) {
      const drop = this.renderer.createElement('div');
      this.renderer.addClass(drop, 'drop');
      this.renderer.setStyle(drop, 'left', Math.floor(Math.random() * 160) + 'px');
      this.renderer.appendChild(this.startWeatherAnimation.nativeElement, drop)

      setTimeout(() =>{
        if (this.startWeatherAnimation) {
          this.startWeatherAnimation.nativeElement.removeChild(drop);
        }
      }, EsLluvia ? 2000 : 20000);
    }
  }
}
