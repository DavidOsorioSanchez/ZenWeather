import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-clouds',
  imports: [],
  templateUrl: './clouds.component.html',
  styleUrl: './clouds.component.css'
})
export class CloudsComponent {
  // @Input () lluvia: number = 0;

  @ViewChild('startRain', { static: true }) startRain: ElementRef | undefined;

  ngAfterViewInit() {
    this.animacionLluvia();
  }
  
  animacionLluvia() {
    if (typeof document !== 'undefined') {
      setInterval(() => {
        this.rain();
      }, 6000);
    }
  }

  rain() {
    if (this.startRain) {
      const e = document.createElement('div');
      e.classList.add('drop ');
      this.startRain.nativeElement.appendChild(e);
    }
  }
}
