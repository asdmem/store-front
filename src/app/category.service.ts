import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Category } from '@models/category.class';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = environment.baseUrl + 'category';

  constructor(private httpClient: HttpClient) { }

  getCategories() {
    return this.httpClient.get<Category[]>(this.baseUrl);
  }

  saveCategory(category: Category) {
    return this.httpClient.post(this.baseUrl, category).subscribe();
  }
}
