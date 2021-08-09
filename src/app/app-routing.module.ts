import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OrderNowComponent } from './order-now/order-now.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: "", redirectTo:'home', pathMatch:'full',
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
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
