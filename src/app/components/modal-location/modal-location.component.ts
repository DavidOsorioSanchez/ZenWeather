import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal-location',
  imports: [],
  templateUrl: './modal-location.component.html',
  styleUrl: './modal-location.component.css'
})
export class ModalLocationComponent {
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {}
  
  setCloseModal(value: boolean) {
    this.closeModal.emit(value);
  }
}
