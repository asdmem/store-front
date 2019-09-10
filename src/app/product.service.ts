import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '@models/product.class';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = environment.baseUrl + 'product';

  constructor(private httpClient: HttpClient) { }

  getProducts() {
    return this.httpClient.get<Product[]>(this.baseUrl);
  }

  save(product: Product) {
    return this.httpClient.post<Product>(this.baseUrl, product);
  }

  search(search: any) {
    return this.httpClient.post<Product[]>(this.baseUrl + '/search', search);
  }
}
