import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyOrderComponent } from '../my-order/my-order.component';
import { OrderNowComponent } from '../order-now/order-now.component';
import { FormsModule } from '@angular/forms';
import { PlaceOrdersComponent } from '../place-orders/place-orders.component';



@NgModule({
  declarations: [
    MyOrderComponent,
    OrderNowComponent,
    PlaceOrdersComponent,


  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class OrderModule { }
