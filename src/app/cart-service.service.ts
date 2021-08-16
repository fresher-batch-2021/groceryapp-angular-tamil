import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  constructor(private http: HttpClient) {

  }


  getCartItems() {

    let cartItemsStr = localStorage.getItem("CART_ITEMS");
    return cartItemsStr != null ? JSON.parse(cartItemsStr) : [];
  }

  addItemToCart(itemObj: any) {
    let cartItems = this.getCartItems();
    cartItems.push(itemObj);
    localStorage.setItem("CART_ITEMS", JSON.stringify(cartItems));

  }

  placeOrder(orderData: any) {
    let url = "";
    return this.http.post(url, orderData);
  }

  emptyCart() {
    localStorage.removeItem("CART_ITEMS");
  }
}
