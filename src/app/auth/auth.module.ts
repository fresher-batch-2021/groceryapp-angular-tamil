import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from '../register/register.component';
import { LoginComponent } from '../login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from '../admin/admin.component';
import { AuthRoutingModule } from './auth-routing.module';



@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    AdminComponent,

    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
