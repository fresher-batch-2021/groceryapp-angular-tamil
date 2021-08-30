import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import * as _ from 'lodash';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-place-orders',
  templateUrl: './place-orders.component.html',
  styleUrls: ['./place-orders.component.css']
})
export class PlaceOrdersComponent implements OnInit {

  placeOrderList: any;
  recentOrderList: any;

  statusFilterForm: any;
  filter: any;

  constructor(private orderService: OrderService,
    private fb: FormBuilder) {
    this.statusFilterForm = this.fb.group({
      status: new FormControl("ALL", Validators.required)
    })
    this.getOrderList();
  }

  ngOnInit(): void {
  }

  searchOrderResults: any;

  getOrderList() {
    this.orderService.OrderList().subscribe((res: any) => {
      let row = res.rows;
      let docs = row.map((obj: any) => obj.doc);
      this.placeOrderList = docs;
      console.log("placeOrderList", this.placeOrderList);
      this.recentOrderList = _.orderBy(this.placeOrderList, ["date"], ["desc"]);
      console.log("descending List :", this.recentOrderList);
      this.searchOrderResults = this.recentOrderList;
    })
  }



  changeDelivered(order: any) {


    console.log("order :", order);
    order.status = "DELIVERED";
    order.comments = "Thank you for shopping...";
    order.deliveredDate = new Date().toJSON();


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
      order.comments = cancellationReason;
      order.cancelledDate = new Date().toJSON();

      this.orderService.updateStatus(order).subscribe((res) => {
        console.log("Cancelled Status Changed Successfully", res);
        document.location.reload();
      })
    }
  }


  statusFilter() {

    this.filter = this.statusFilterForm.value.status;

    this.searchOrderResults = this.filter == 'ALL' ? this.recentOrderList : this.recentOrderList.filter((obj: any) => obj.status == this.filter);


    console.log("status Filter :", this.filter);

  }
}
