import { Component, OnInit } from '@angular/core';
import { Card } from "../../common-ui/card/card";
import { RouterModule } from '@angular/router';
import { Sidebar } from "../../common-ui/sidebar/sidebar";
import { ProductService } from '../../data/products';
import { Product } from '../../models/product.model';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-catalog-page',
  imports: [Card, RouterModule, Sidebar],
  templateUrl: './catalog-page.html',
  styleUrl: './catalog-page.css',
})

export class CatalogPage implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      this.cdr.detectChanges();  
    });
  }

}
