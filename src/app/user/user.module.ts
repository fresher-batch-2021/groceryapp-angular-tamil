import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from '../user-list/user-list.component';
import { UserRoutingModule } from './user-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    UserListComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule
  ]
})
export class UserModule { }
