import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { CategoryService } from '../category.service';
import { Category } from '../../models/category.class';
import { Type } from '@models/additional-props.class';
import { Product } from '../../models/product.class';
import { AdditionalPropsValue } from '../../models/additional-props-value.class';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {
  form: FormGroup;
  categories: Category[] = [];
  loadadedCategory?: Category = { additionalProps: [] } as Category;

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.initForm();
    this.categoryService
      .getCategories()
      .subscribe(it => (this.categories = it));
  }

  initForm() {
    const categoryControl = this.fb.control(null, [Validators.required]);
    categoryControl.valueChanges.subscribe(id => this.categorySelected(id));
    this.form = this.fb.group({
      name: ['', Validators.required],
      detail: '',
      price: ['', Validators.required],
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

  save() {
    const { name, detail, price, categoryId } = this.form.value as Product;
    const product: Product = {
      id: 0,
      name,
      detail,
      price,
      categoryId
    };
    const group = this.form.get('props') as FormGroup;
    product.additionalPropsValues = Object.entries(group.controls).map(
      ([key, control]) => {
        return new AdditionalPropsValue(
          0,
          String(control.value),
          Number.parseInt(key, 10),
        );
      }
    );
    // bug error state is not resetted
    this.productService.save(product).subscribe(() => this.form.reset());
  }
}
