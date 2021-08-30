import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit {

  email : any;
  userEmail : any;

  placeOrderList : any;
  descPlaceOrderList : any;

  constructor(private orderService : OrderService) 
  { 
    this.email = localStorage.getItem("LOGGED_IN_USER");
    this.userEmail = this.email != null ? JSON.parse(this.email) : [];
    console.log("email", this.userEmail.email);
  }

  ngOnInit(): void {
    this.getAllProduct();
  }

  getAllProduct()
  {

    let query = {
      selector: {
        createdBy: this.userEmail.email
      }
    }

    
    this.orderService.getMyOrders(query).subscribe((res : any) => {
      console.log("res", res.docs);
      this.placeOrderList = res.docs;
      console.log("data", this.placeOrderList);
      this.descPlaceOrderList = _.orderBy(this.placeOrderList, ["date"], ["desc"])
      console.log("desc", this.descPlaceOrderList);    
    }, err => {
      console.log("err", err);
    })
  }

  changeCancelled(order : any)
  {
    console.log("cencelled", order.status);

    let userOrderCancelled = prompt("Enter Reason");    
    alert(userOrderCancelled);
    if(userOrderCancelled != null && userOrderCancelled != "" && userOrderCancelled.trim() != "" && userOrderCancelled.length > 3)
    {
    order.status="CANCELLED";
    order.comments = userOrderCancelled;
    order.cancelledDate = new Date().toJSON();

    this.orderService.updateStatus(order).subscribe((res) => {
      console.log("Cancelled Status Changed Successfully", res);
      document.location.reload();
    })
    }

  }
}
