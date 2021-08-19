import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartServiceService } from '../cart-service.service';
import { OrderService } from '../order.service';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-order-now',
  templateUrl: './order-now.component.html',
  styleUrls: ['./order-now.component.css']
})
export class OrderNowComponent implements OnInit {

  cartItems: any;

  email: string | null;


  constructor(private route: ActivatedRoute,
    private service: CartServiceService,
    private orderService : OrderService) {

    this.cartItems = this.service.getCartItems();
    console.log("cart", this.cartItems);
    this.email = localStorage.getItem("emailAddress");
    console.log("email", this.email);

  }

  ngOnInit(): void { }


  confirmOrder() {
    if (this.email != null && this.email != "") {
      alert("Order Add Successfully");
      let orderData = {
        items: this.cartItems,
        createdBy: this.email,
        status: "order",
        date: new Date()
      }
      console.log("e", orderData);

      this.orderService.placeOrder(orderData).subscribe(res => {
        this.service.emptyCart();
        window.location.reload();
      })

    }
    else {
      alert("please login or register");
      window.location.href = "/login";
    }
  }

  emptyCart() {
    localStorage.removeItem("CART_ITEMS");
    document.location.reload();
  }

  removeItem(product : any)
  {
    this.service.removeItem(product);
    document.location.reload();
  }
}
