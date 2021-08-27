import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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

  user: any;


  constructor(private route: ActivatedRoute,
    private service: CartServiceService,
    private orderService : OrderService,
    private router : Router,
    private toastr : ToastrService) {

    this.cartItems = this.service.getCartItems();
    console.log("cart", this.cartItems);
    let userEmail = localStorage.getItem("LOGGED_IN_USER");
    this.user = userEmail != null ? JSON.parse(userEmail) : [];
    console.log("user.email", this.user.email);

    this.calculateTotalAmount();


  }

  calculateTotalAmount(){
    this.totalBillAmount = 0;
    for(let item of this.cartItems){
      this.totalBillAmount += item.unit * item.price;
    }
  
  }

  ngOnInit(): void { }

  products:any = [];

  totalBillAmount = 0;

  updatePrice(index:number){
    console.log('change ' , index);
    let cartItem = this.cartItems[index];
    cartItem.totalPrice = cartItem.unit * cartItem.price;
    this.cartItems[index] = cartItem;
    this.calculateTotalAmount();
  }

  confirmOrder() {
    if (this.user.email != null && this.user.email != "") {
      // alert("Order Add Successfully");
      this.toastr.success("Order Added Successfully");
      let orderData = {
        items: this.cartItems,
        createdBy: this.user.email,
        status: "ORDER",
        date: new Date(),
        totalBillAmount : this.totalBillAmount
      }
      console.log("e", orderData);

      this.orderService.placeOrder(orderData).subscribe(res => {
        this.service.emptyCart();
        window.location.reload();
      })
      

    }
    else {
      // alert("please login or register");
      this.toastr.error("Please Login or Register");
      // window.location.href = "/login";
      this.router.navigate(["/login"]);
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

  orderMore()
  {
    this.router.navigate(["/home"]);
  }
}
