import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from '../products.service';
import { Items, MyorderDto } from '../myorder-dto';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css'],
})
export class MyOrderComponent implements OnInit {
  email: any;
  userEmail: any;

  placeOrderList: any;
  descPlaceOrderList: any;

  constructor(private orderService: OrderService,
    private toastr : ToastrService,
    private productService : ProductsService) {
    this.email = localStorage.getItem('LOGGED_IN_USER');
    this.userEmail = this.email != null ? JSON.parse(this.email) : [];
    console.log('email', this.userEmail.email);
  }

  ngOnInit(): void {
    this.getAllProduct();
  }

  getAllProduct() {
    
    this.orderService.getMyOrders(this.userEmail.email).subscribe(
      (res: any) => {
        console.log('res', res.docs);
        this.placeOrderList = res.docs;
        console.log('data', this.placeOrderList);
        this.descPlaceOrderList = _.orderBy(
          this.placeOrderList,
          ['date'],
          ['desc']
        );
        console.log('desc', this.descPlaceOrderList);
      },
      (err) => {
        console.log('err', err);
      }
    );
  }

  changeCancelled(order: any) {    

    let userOrderCancelled = prompt('Enter Reason');    
    if (
      userOrderCancelled != null &&
      userOrderCancelled != '' &&
      userOrderCancelled.trim() != '' &&
      userOrderCancelled.length > 3
    ) {
      order.status = 'CANCELLED';
      order.comments = userOrderCancelled;
      order.cancelledDate = new Date().toJSON();

      // console.log("##%$#%#@", order.items);
      // const myorderDto = new MyorderDto(order);
      // const item = new Items(order.items);
      // console.log(myorderDto, item);


      this.orderService.updateStatus(order).subscribe((res) => {
        this.increaseStock(order);
        console.log('Cancelled Status Changed Successfully', res);
        this.toastr.success("Order Cancelled successfully");
        document.location.reload();
      });
    }
  }

  increaseStock(order : any)
  {

    console.log("order###", order.items);

    for(let item of order.items)
    {
      console.log(item);

      this.productService.getProduct(item.id).subscribe(res=>{

        let product:any = res;
        product.stock += item.unit ;
        this.productService.updateProuductsStock(product).subscribe(res=>{
          console.log(item +" stock updated");
        })

      })

    }
    
  }

  getStyle(status: any) {
    let badge;
    console.log('status', status);
    if (status == 'CANCELLED') {
      badge = '#d9534f';
    } else if (status == 'DELIVERED') {
      badge = 'mediumseagreen';
    } else if (status == 'ORDER') {
      badge = '#f0ad4e';
    }
    return badge;
  }
}

