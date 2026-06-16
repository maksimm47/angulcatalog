import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-product-modal',
  imports: [],
  templateUrl: './product-modal.html',
  styleUrl: './product-modal.css',
})
export class ProductModal {
  @Input() product!: Product;
  @Output() close = new EventEmitter<void>()

  onCloseButton(){
    this.close.emit()
  }
}
