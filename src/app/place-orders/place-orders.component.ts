import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-place-orders',
  templateUrl: './place-orders.component.html',
  styleUrls: ['./place-orders.component.css']
})
export class PlaceOrdersComponent implements OnInit {

  placeOrderList: any;

  constructor(private orderService: OrderService) {
    this.getOrderList();
  }

  ngOnInit(): void {
  }

  getOrderList() {
    this.orderService.OrderList().subscribe((res: any) => {
      let row = res.rows;
      let docs = row.map((obj: any) => obj.doc);
      this.placeOrderList = docs;
      console.log("placeOrderList", this.placeOrderList);
    })
  }



  changeDelivered(order: any) {


    console.log("order :", order);
    order.status = "DELIVERED";


    this.orderService.updateStatus(order).subscribe((res) => {
      console.log("Delivered Status Changed Successfully", res);
      document.location.reload();
    })
  }

  changeCancelled(order: any) {
    let cancellationReason = prompt("Enter reason");
    console.log("cancel Reason", cancellationReason);
    if (cancellationReason != null && cancellationReason != "" && cancellationReason.trim() != "" && cancellationReason.length > 3) {
      order.status = "CANCELLED";

      this.orderService.updateStatus(order).subscribe((res) => {
        console.log("Cancelled Status Changed Successfully", res);
        document.location.reload();
      })
    }
  }


}
