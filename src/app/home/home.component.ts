import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { CartServiceService } from '../cart-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  product: any;
  unit: any;
  price: any;

  products: any;
  categories: any;

  itemslist: any;

  totalPrice: any;

  constructor(private router: Router, private cartService: CartServiceService,
    private http: HttpClient) {

    this.getProduct();
  }



  ngOnInit(): void {
  }

  // gotoCart(productName: string, price: number) {
  //   this.router.navigateByUrl("ordernow?productName=Apple&Kg=1&price=120");
  // }

  getProduct() {

    const dbUsername = "apikey-v2-1xzbb618xtgfg14nm7uasm9coajsc9dzzpg8p57atbtg";
    const dbPassword = "f56766c5716a7b37a531aaa7bdb53315";
    const basicAuth = "Basic " + btoa(dbUsername + ":" + dbPassword);

    // const url = "assets/products.json";
    // const url = "https://product-mock-api.herokuapp.com/groceryapp/api/v1/products";
    const url = "https://8ca8138b-1aac-430a-8325-3a686242a515-bluemix.cloudantnosqldb.appdomain.cloud/grocerystoreapp_products/_all_docs?include_docs=true";
    this.http.get(url, { headers: { Authorization: basicAuth } }).subscribe((res : any) => {
      let data:any = res.rows;

      this.products = data.map((obj:any)=>obj.doc);
      console.log("pro", this.products);
      // console.log(this.products);
      this.categories = _.groupBy(this.products, 'category');
      console.log("categories", this.categories);
      /*let categories = Object.keys(products);
       console.log("keys",categories);
       for( let category of categories)
       {
         const productItems = products[category];
         console.log("category",category);
         console.log(productItems);
       }*/
    })
  }

  getProductItems(category: any) {
    console.log("return", this.products[category]);
    return this.categories[category];
  }

  addCart(id: number, productName: string, qty: number, type: string, price: number) {
    // console.log("id", id);
    // console.log("product :", productName);
    // console.log("unit :", qty);
    // console.log("type :", type)
    // console.log("price :", price);
    // this.product = product;
    // this.unit = unit;
    // this.price = price;
    // this.router.navigateByUrl("ordernow?productName=" + this.product + "&Kg=" + this.unit + "&price=" + this.price);



    alert("product added");
    this.totalPrice = qty * price;
    var itemObj = { "id": id, "productName": productName, "unit": qty, "price": price, "totalPrice": this.totalPrice };
    console.log(itemObj);
    this.itemslist = itemObj;
    console.log("itemlist", this.itemslist);

    // const cartItems = JSON.parse(localStorage.getItem("CART_ITEMS")) || [];
    this.cartService.addItemToCart(itemObj);



  }
}
