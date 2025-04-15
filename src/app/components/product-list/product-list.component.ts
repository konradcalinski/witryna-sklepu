import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../../services/product.service';
import { ProductCardComponent } from '../product-card/product-card.component';
import { NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  imports: [
    ProductCardComponent,
    NgForOf,
    FormsModule
  ],
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  activeCategory: string = '';

  categories: { [key: string]: boolean } = {
    trening: true,
    dieta: true,
    premium: true
  };

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.filteredProducts = products;
    });
  }

  updateCategoryFilter(category: string) {
    this.activeCategory = category;
    this.applyFilters();
  }

  applyFilters() {
   if (this.activeCategory === "all") {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(
        product => product.category === this.activeCategory
      );
    }
  }
}
