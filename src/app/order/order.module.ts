import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyOrderComponent } from '../my-order/my-order.component';
import { OrderNowComponent } from '../order-now/order-now.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlaceOrdersComponent } from '../place-orders/place-orders.component';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    MyOrderComponent,
    OrderNowComponent,
    PlaceOrdersComponent,


  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule
  ]
})
export class OrderModule { }
