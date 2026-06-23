import { Component, OnInit } from '@angular/core';
import { Card } from "../../common-ui/card/card";
import { RouterModule } from '@angular/router';
import { Sidebar } from "../../common-ui/sidebar/sidebar";
import { ProductService } from '../../data/products.service';
import { Product } from '../../models/product.model';
import { ChangeDetectorRef } from '@angular/core';
import { ProductModal } from "../../common-ui/modals/product-modal/product-modal";
import { CategoryService } from '../../data/categories.service';
import { Category } from '../../models/categories.model';
import { CartService } from '../../data/cart.service';

@Component({
  selector: 'app-catalog-page',
  imports: [Card, RouterModule, Sidebar, ProductModal],
  templateUrl: './catalog-page.html',
  styleUrl: './catalog-page.css',
})

export class CatalogPage implements OnInit {
  products: Product[] = [];
  Categories: Category[] = [];

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private cartService: CartService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      this.cdr.detectChanges();  
    });
    this.categoryService.getCategories().subscribe(data =>{
      this.Categories = data;
      this.cdr.detectChanges();
    })
  }

  isModalOpen: boolean = false;
  selectedProduct: Product | null = null

  openProductModal(product: Product) {
    this.selectedProduct = product;
    this.isModalOpen = true;
  }

  closeProductModal(){
    this.isModalOpen = false;
  }

  onAddToCart(product: Product){
    this.cartService.addToCart(product)
  }
}
