import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AdminListComponent } from './admin-list/admin-list.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminGuard } from './admin.guard';
import { AdminComponent } from './admin/admin.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard';
import { ChartComponent } from './chart/chart.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { OrderNowComponent } from './order-now/order-now.component';
import { PlaceOrdersComponent } from './place-orders/place-orders.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { ProductListComponent } from './product-list/product-list.component';
import { RegisterComponent } from './register/register.component';
import { RemoveProductComponent } from './remove-product/remove-product.component';
import { SideNavBarComponent } from './side-nav-bar/side-nav-bar.component';

import { UserListComponent } from './user-list/user-list.component';


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
    path: "register", component: RegisterComponent,
  },
  {
    path: "login", component: LoginComponent,
  },
  {
    path: "ordernow", component: OrderNowComponent,
  },
  {
    path: "header", component: HeaderComponent,
  },
  {
    path: "footer", component: FooterComponent,
  },
  {
    path: "admin", component: AdminComponent,
  },
  {
    path: "adminPanel", component: AdminPanelComponent, canActivate: [AdminGuard] ,children: [
      
      {
        path: "", redirectTo: "adminList", pathMatch: "full"
      },
      {
        path: "adminList", component: AdminListComponent,
      },
      {
        path: "userList", component: UserListComponent
      },
      {
        path: "productList", component: ProductListComponent
      },
      {
        path: "addProduct", component: AddProductComponent
      },
      {
        path: "removeProduct", component: RemoveProductComponent
      },
      {
        path: "placeOrders", component: PlaceOrdersComponent
      }
    ]
  }, 
  {
    path: "productcategory/:category", component: ProductCategoryComponent
  },
  {
    path: "myOrder", component: MyOrderComponent, canActivate: [AuthGuard]
  },
  {
    path: "chart", component: ChartComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
