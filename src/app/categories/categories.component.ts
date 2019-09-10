import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '@models/category.class';
import { CategoryService } from '../category.service';
import { AdditionalProps } from '../../models/additional-props.class';
import { MatBottomSheet } from '@angular/material';
import { CategoryCreateComponent } from '../category-create/category-create.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];

  constructor(
    private categoryService: CategoryService,
    private bottomSheet: MatBottomSheet
  ) {}

  async ngOnInit() {
    this.categories = await this.categoryService.getCategories().toPromise();
  }

  remove(category: Category) {
    this.categoryService.remove(category).subscribe(removedCategory => {
      const index = this.categories.findIndex(it => it.id === removedCategory.id);
      this.categories.splice(index, 1);
    });
  }

  added(category?: Category) {
    if (category != null) {
      this.categories.push(category);
    }
  }

  create() {
    const ref = this.bottomSheet.open(CategoryCreateComponent);
    ref.afterDismissed().subscribe(category => this.added(category));
  }
}
