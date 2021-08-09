import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-now',
  templateUrl: './order-now.component.html',
  styleUrls: ['./order-now.component.css']
})
export class OrderNowComponent implements OnInit {

  cartItems:any;

  email:string | null;

  cartItem = { productName: null, price: null, qty : null};

  constructor(private route:ActivatedRoute) { 

    this.cartItem["productName"] = this.route.snapshot.queryParams["productName"];
    this.cartItem["qty"] = this.route.snapshot.queryParams["Kg"];
    this.cartItem["price"] = this.route.snapshot.queryParams["price"];
    
    this.email = localStorage.getItem("emailAddress");
    console.log("email", this.email);
    this.cartItems = this.getCartItems();
   }

  ngOnInit(): void {

    this.addToCart();
    this.loadCartItems();
  }

  //get cart items from localStorage
  getCartItems(){

    let cartItemStr = localStorage.getItem("CART_ITEMS");
    let cartItems =  cartItemStr != null ? JSON.parse(cartItemStr) : [];
    return cartItems;

  }

  // add item to cart
  addToCart(){
    if (this.cartItem.productName != null && this.cartItem.price != null){
    this.cartItems.push(this.cartItem);
    localStorage.setItem("CART_ITEMS", JSON.stringify(this.cartItems));
    }
  }

  //get cart items 
  loadCartItems(){

    this.cartItems = this.getCartItems();
  }

  confirmOrder()
  {
    if(this.email != null && this.email != "")
    {
      alert("Order Add Successfully");
      window.localStorage.clear();
      window.location.reload();
    }
    else
    {
      alert("please login or register");
      window.location.href = "/login";
    }
  }
}
