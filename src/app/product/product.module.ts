import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from '../product-list/product-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SearchPipe } from '../search.pipe';
import { AddProductComponent } from '../add-product/add-product.component';
import { ProductCategoryComponent } from '../product-category/product-category.component';
import { ProductsComponent } from '../products/products.component';
import { RemoveProductComponent } from '../remove-product/remove-product.component';




@NgModule({
  declarations: [
    ProductListComponent,
    SearchPipe,    
    ProductsComponent,
    ProductCategoryComponent,    
    AddProductComponent,
    RemoveProductComponent,
    

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  exports:[
    ProductsComponent
  ]
})
export class ProductModule { }
