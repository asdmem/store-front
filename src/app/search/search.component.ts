import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Category } from '@models/category.class';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { CategoryService } from '../category.service';
import { Type } from '@models/additional-props.class';
import { Product } from '../../models/product.class';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Output() searchResult = new EventEmitter<Product[] | null>();

  form: FormGroup;
  categories: Category[] = [];
  loadadedCategory?: Category = { additionalProps: [] } as Category;

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.categoryService
      .getCategories()
      .subscribe(it => (this.categories = it));
    const categoryControl = this.fb.control(null);
    categoryControl.valueChanges.subscribe(id => this.categorySelected(id));
    this.form = this.fb.group({
      name: null,
      detail: null,
      price: null,
      categoryId: categoryControl,
      props: this.fb.group({})
    });
  }

  async categorySelected(id: number | null) {
    if (id == null) {
      return;
    }
    const category = await this.categoryService.getCategoryById(id).toPromise();
    this.loadadedCategory = category;
    const group = this.form.get('props') as FormGroup;
    category.additionalProps.forEach(prop => {
      const initialValue: string | number = prop.type === Type.Numeric ? 0 : '';
      group.addControl(prop.id.toString(), this.fb.control(initialValue));
    });
  }

  search() {
    this.productService
      .search(this.form.value)
      .subscribe(products => this.searchResult.emit(products));
  }

  reset() {
    this.searchResult.emit(null);
  }
}
