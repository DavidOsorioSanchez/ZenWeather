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

  /**
   * Updates the position of the `astro` element based on the current hour of the day.
   * 
   * The position is calculated as a percentage of the total width, where each hour
   * corresponds to approximately 4.1667% (100% / 24 hours). The calculated position
   * is rounded to the nearest integer, with a minimum value of 1% to ensure visibility.
   * 
   * If the `astro` element exists, its `left` style property is updated to the calculated
   * position, and its `transform` property is set to center it horizontally.
   */
  astroMove() {
    const hour = new Date().getHours();

    const position = (hour - 1) * (100 / 24); // 100% / 24 hours = 4.166666666666667% per hour
    const roundedPosition = position === 0 ? 1 : Math.round(position);
    if (this.astro) {
      this.astro.nativeElement.style.left = roundedPosition + '%';
      this.astro.nativeElement.style.transform = 'translateX(-50%)';
    }
  }
  constructor() { }

}
