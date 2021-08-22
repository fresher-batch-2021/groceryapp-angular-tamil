import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AdminListComponent } from './admin-list/admin-list.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminComponent } from './admin/admin.component';
import { AppComponent } from './app.component';
import { CookiesComponent } from './cookies/cookies.component';
import { DryFruitsComponent } from './dry-fruits/dry-fruits.component';
import { FooterComponent } from './footer/footer.component';
import { FruitsComponent } from './fruits/fruits.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OrderNowComponent } from './order-now/order-now.component';
import { PlaceOrdersComponent } from './place-orders/place-orders.component';
import { ProductListComponent } from './product-list/product-list.component';
import { RegisterComponent } from './register/register.component';
import { RemoveProductComponent } from './remove-product/remove-product.component';
import { SideNavBarComponent } from './side-nav-bar/side-nav-bar.component';
import { SoftDrinksComponent } from './soft-drinks/soft-drinks.component';
import { SpicyChipsComponent } from './spicy-chips/spicy-chips.component';
import { UserListComponent } from './user-list/user-list.component';
import { VegetableOilsComponent } from './vegetable-oils/vegetable-oils.component';
import { VegetablesComponent } from './vegetables/vegetables.component';

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
    path: "adminPanel", component: AdminPanelComponent, children: [
      
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
    path: "fruits", component: FruitsComponent
  },
  {
    path: "cookies", component: CookiesComponent
  },
  {
    path: "vegetables", component: VegetablesComponent
  },
  {
    path: "softDrinks", component: SoftDrinksComponent
  },
  {
    path: "dryFruits", component: DryFruitsComponent
  },
  {
    path: "spicyChips", component: SpicyChipsComponent
  },
  {
    path: "vegetableOils", component: VegetableOilsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
