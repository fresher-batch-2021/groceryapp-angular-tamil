import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from '../admin/admin.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

const routes: Routes = [

    {
        path: "register", component: RegisterComponent,
      },
      {
        path: "login", component: LoginComponent,
      },
      {
        path: "admin", component: AdminComponent,
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
