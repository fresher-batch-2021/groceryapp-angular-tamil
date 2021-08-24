import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from '../user-list/user-list.component';
import { MyOrderComponent } from '../my-order/my-order.component';



@NgModule({
  declarations: [
    UserListComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class UserModule { }
