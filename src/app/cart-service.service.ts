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
    let cartItems:any = this.getCartItems();
    let index = cartItems.findIndex((obj:any)=>obj.id == itemObj.id);
    if(index == -1){
    cartItems.push(itemObj);
    }
    else {
      cartItems[index].unit +=1;
      cartItems[index].totalPrice = cartItems[index].unit * cartItems[index].price;  
    }
    localStorage.setItem("CART_ITEMS", JSON.stringify(cartItems));

  }



  emptyCart() {
    localStorage.removeItem("CART_ITEMS");
  }

  removeItem(product : any)
  {
    let cartItems = this.getCartItems();
    let index = cartItems.map((obj : any) => obj.productName == product);
    console.log("index", index);
    if(index != -1)
    {
      cartItems.splice(index, 1);
    }
    localStorage.setItem("CART_ITEMS", JSON.stringify(cartItems));
  }
}
