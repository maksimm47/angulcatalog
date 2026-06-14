import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-product-modal',
  imports: [],
  templateUrl: './product-modal.html',
  styleUrl: './product-modal.css',
})
export class ProductModal {
  @Output() close = new EventEmitter<void>()

  onCloseButton(){
    this.close.emit()
  }
}
