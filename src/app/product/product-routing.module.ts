import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from '../add-product/add-product.component';
import { ProductCategoryComponent } from '../product-category/product-category.component';
import { ProductListComponent } from '../product-list/product-list.component';
import { RemoveProductComponent } from '../remove-product/remove-product.component';

const routes: Routes = [

    {
        path: "productList", component: ProductListComponent
    },
   
    {
        path: "addProduct", component: AddProductComponent
    },
    {
        path: "removeProduct", component: RemoveProductComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductRoutingModule { }
