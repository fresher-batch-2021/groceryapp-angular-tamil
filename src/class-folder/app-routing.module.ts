import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from '../app/about/about.component';
import { AdminGuard } from '../app/admin.guard';
import { AuthGuard } from '../app/auth.guard';
import { HomeComponent } from '../app/home/home.component';
import { MyOrderComponent } from '../app/my-order/my-order.component';
import { OrderNowComponent } from '../app/order-now/order-now.component';
import { ProductCategoryComponent } from '../app/product-category/product-category.component';


const routes: Routes = [
  {
    path: "", redirectTo: 'home', pathMatch: 'full',
  },
  {
    path: "home", component: HomeComponent,
  },
  {
    path: "about", component: AboutComponent,
  },
 
  {
    path: "ordernow", component: OrderNowComponent,
  },


 
 
  {
    path:'auth',
    loadChildren: () => import('../app/auth/auth.module').then(m => m.AuthModule)
  }, 
  {
    path: "productcategory/:category", component: ProductCategoryComponent
},

  {
    path:'admin',
    loadChildren: () => import('../app/admin/admin.module').then(m => m.AdminModule)
  }, 


  {
    path: "adminPanel",  
    loadChildren: () => import('../app/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AdminGuard] 
  }, 
  {
    path: "myOrder", component: MyOrderComponent, canActivate: [AuthGuard]
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
