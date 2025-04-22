import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-astro',
  imports: [],
  templateUrl: './astro.component.html',
  styleUrl: './astro.component.css'
})
export class AstroComponent {
  @Input() cambio: number = 1;
  constructor() { }

}
