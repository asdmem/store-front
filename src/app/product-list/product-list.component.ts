import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.class';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  displayedColumns = ['id', 'name', 'detail', 'price', 'category'];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.loadProducts();
  }

  async loadProducts() {
    this.products = await this.productService.getProducts().toPromise();

  }

  showSearchResults(products: Product[]) {
    if (products == null) {
      this.loadProducts();
      return;
    }
    this.products = products;
  }

}
