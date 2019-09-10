import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Category } from '@models/category.class';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = environment.baseUrl + 'category';

  constructor(private httpClient: HttpClient) {}

  getCategories() {
    return this.httpClient.get<Category[]>(this.baseUrl);
  }

  getCategoryById(id: number) {
    return this.httpClient.get<Category>(this.baseUrl + `/${id}`);
  }

  saveCategory(category: Category) {
    return this.httpClient.post<Category>(this.baseUrl, category);
  }

  remove(category: Category) {
    return this.httpClient.delete<Category>(this.baseUrl + `/${category.id}`);
  }
}
