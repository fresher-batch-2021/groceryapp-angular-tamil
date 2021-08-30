import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartServiceService } from '../cart-service.service';
import { ProductsService } from '../products.service';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  product: any;
  unit: any;
  price: any;

  @Input()
  noOfProducts: number = 0;

  products: any;
  categories: any;

  itemslist: any;

  totalPrice: any;

  constructor(private router: Router,
    private cartService: CartServiceService,
    private http: HttpClient,
    private productService: ProductsService,
    private toastr: ToastrService) {
    console.log("Products Constructor");
    this.getProduct();
  }

  ngOnInit(): void {
    this.itemslist = this.cartService.getCartItems();
  }

  getProduct() {

    this.productService.getAllProducts().subscribe((res: any) => {
      let data: any = res.rows;

      this.products = data.map((obj: any) => obj.doc);
      console.log("pro", this.products);
      this.categories = _.groupBy(this.products, 'category');
      console.log("categories", this.categories);
    })
  }

  getProductItems(category: any) {
    if (this.noOfProducts == 0) {
      return this.categories[category];
    }
    else {
      return this.categories[category].slice(0, this.noOfProducts);
    }
  }

  addCart(id: number, productName: string, qty: number, type: string, price: number) {
    console.log("id", id);
    console.log("product :", productName);
    console.log("unit :", qty);
    console.log("type :", type)
    console.log("price :", price);

    this.toastr.success("Product Added");
    this.totalPrice = qty * price;
    var itemObj = { "id": id, "productName": productName, "unit": qty, "price": price, "totalPrice": this.totalPrice };
    console.log(itemObj);

    this.cartService.addItemToCart(itemObj);

    this.itemslist = this.cartService.getCartItems();

  }

  view(viewCategory: any) {
    this.router.navigateByUrl("productcategory/" + viewCategory);
  }

  isItemAdded(productName: string) {

    return this.itemslist.find((obj: any) => obj.productName == productName) != null;
  }
}