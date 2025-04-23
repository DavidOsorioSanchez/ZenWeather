import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-astro',
  imports: [],
  templateUrl: './astro.component.html',
  styleUrl: './astro.component.css'
})
export class AstroComponent {
  @Input() cambio: number = 1;

  @ViewChild('astro', { static: true }) astro: ElementRef | undefined;

  ngAfterViewInit() {
    this.astroMove();
  }

  astroMove() {
    const hour = new Date().getHours();

    const position = (hour - 1) * (100 / 24); // 100% / 24 hours = 4.166666666666667% per hour
    const roundedPosition = Math.round(position);
    if (this.astro) {
      this.astro.nativeElement.style.left = roundedPosition + '%';
      this.astro.nativeElement.style.transform = 'translateX(-50%)';
    }
  }
  constructor() { }

}
