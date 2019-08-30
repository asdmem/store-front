import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductCreateComponent } from './product-create/product-create.component';


const routes: Routes = [
  {
    component: ProductListComponent,
    path: 'products',
  },
  {
    component: CategoriesComponent,
    path: 'categories'
  },
  {
    component: ProductCreateComponent,
    path: 'create'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
