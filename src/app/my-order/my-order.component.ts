import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit {

  email : any;

  placeOrderList : any;

  constructor(private orderService : OrderService) 
  { 
    this.email = localStorage.getItem("emailAddress");
    console.log("email", this.email);
    this.getAllProduct();
  }

  ngOnInit(): void {
  }

  getAllProduct()
  {

    let query = {
      selector: {
        createdBy: this.email
      }
    }

    
    this.orderService.getMyOrders(query).subscribe((res : any) => {
      console.log("res", res.docs);
      this.placeOrderList = res.docs;
      console.log("data", this.placeOrderList);
      // this.placeOrderList = data.map((obj : any) => obj.doc);
      // console.log("docs", this.placeOrderList);
      
    }, err => {
      console.log("err", err);
    })
  }

  changeCancelled(order : any)
  {
    console.log("cencelled", order.status);

    order.status="CANCELLED";

    this.orderService.updateStatus(order).subscribe((res) => {
      console.log("Cancelled Status Changed Successfully", res);
      document.location.reload();
    })
  }
}
