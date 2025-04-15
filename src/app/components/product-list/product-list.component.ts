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

  categories: { [key: string]: boolean } = {
    trening: true,
    dieta: true,
    premium: true
  };

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.applyFilters();
    });
  }

  updateCategoryFilter(category: string, event: Event) {
    const checkbox = event.target as HTMLInputElement;
    this.categories[category] = checkbox.checked;
    this.applyFilters();
  }

  applyFilters() {
    const activeCategories = Object.keys(this.categories).filter(cat => this.categories[cat]);
    if (activeCategories.length === 0) {
      this.filteredProducts = [];
    } else {
      this.filteredProducts = this.products.filter(product =>
        activeCategories.includes(product.category)
      );
    }
  }
}
