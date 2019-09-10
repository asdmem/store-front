import { Component, OnInit } from '@angular/core';
import { Category } from '@models/category.class';
import { AdditionalProps } from '@models/additional-props.class';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CategoryService } from '../category.service';
import { CategoriesComponent } from '../categories/categories.component';
import { MatBottomSheetRef } from '@angular/material';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.scss']
})
export class CategoryCreateComponent implements OnInit {
  form: FormGroup;

  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private bottomSheetRef: MatBottomSheetRef<CategoriesComponent>
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      array: fb.array([])
    });
  }

  ngOnInit() {}

  submit(value: { name: string; array: { name: string; type: number }[] }) {
    const category = new Category();
    category.name = value.name;
    category.additionalProps = this.araryToProperties(value.array);
    this.categoryService
      .saveCategory(category)
      .subscribe(savedCategory => this.bottomSheetRef.dismiss(savedCategory));
  }

  araryToProperties(
    array: { name: string; type: number }[]
  ): AdditionalProps[] {
    const props: AdditionalProps[] = [];

    array.forEach(({ name, type }) => {
      const prop = new AdditionalProps(0, name, type);
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
