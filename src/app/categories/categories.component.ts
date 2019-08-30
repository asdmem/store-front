import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '@models/category.class';
import { CategoryService } from '../category.service';
import { AdditionalProps } from '../../models/additional-props.class';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  form: FormGroup;

  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      array: fb.array([])
    });
  }

  async ngOnInit() {
    this.categories = await this.categoryService.getCategories().toPromise();
  }

  submit(value: { name: string; array: { name: string; type: number }[] }) {
    const category = new Category();
    category.name = value.name;
    category.additionalProps = this.araryToProperties(value.array);
    this.categoryService.saveCategory(category);
  }

  araryToProperties(
    array: { name: string; type: number }[]
  ): AdditionalProps[] {
    const props: AdditionalProps[] = [];
    array.forEach(({ name, type }) => {
      const prop = new AdditionalProps(name, type);
      props.push(prop);
    });
    return props;
  }

  addProperty() {
    const array = this.form.get('array') as FormArray;
    array.push(
      this.fb.group({
        name: ['', Validators.required],
        type: 1
      })
    );
  }
}
