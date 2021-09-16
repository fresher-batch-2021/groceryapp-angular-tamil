import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartServiceService } from '../cart-service.service';
import { ProductsService } from '../products.service';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Productdto } from 'src/class-folder/productdto';

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
  categories!: any;

  itemslist: any;

  totalPrice: any;

  constructor(private router: Router,
    private cartService: CartServiceService,
    private http: HttpClient,
    private productService: ProductsService,
    private toastr: ToastrService,
    private spinner : NgxSpinnerService) {
    console.log("Products Constructor");
    this.getProduct();
  }

  ngOnInit(): void {
    this.itemslist = this.cartService.getCartItems();
  }

  getProduct() {

    try {

      this.spinner.show();
      this.productService.getAvailableProducts().subscribe((res: any) => {      
        let data: Productdto[] = res.docs;
        console.log("check1", data);
  
        // this.products = data.map((obj: any) => obj.doc);
        // console.log("pro", this.products);
        // this.categories = _.groupBy(this.products, 'category');
        // console.log("categories", this.categories);
  
        this.categories = _.groupBy(data, 'category');
        console.log("check2", this.categories);
  
        setTimeout(() => {
          this.spinner.hide();
        }, 1000);
  
      })

    }
    catch (err) {
      console.log("error", err);
    }
  }

  getProductItems(category: any) {
    let categoryItems = this.categories[category];
    if (this.noOfProducts == 0) {
      return categoryItems;
    }
    else {
      return this.categories[category].filter( (obj:any) => obj.stock != 0).slice(0, this.noOfProducts);
    }
  }

  addCart(id: string, rev: string, productName: string, qty: number, type: string, price: number, stock : number, category : string, imgUrl : string, stocktype : string) {
    console.log("id", id);
    console.log("rev", rev);
    console.log("product :", productName);
    console.log("unit :", qty);
    console.log("type :", type)
    console.log("price :", price);
    console.log("no Of Stock", stock);
    console.log("category", category);
    console.log("stockImg", imgUrl)
    console.log("stockType", stocktype);

    this.toastr.success("Product Added");
    this.totalPrice = qty * price;
    var itemObj = { "id": id, "rev": rev, "productName": productName, "unit": qty, "price": price, "totalPrice": this.totalPrice, "stock": stock, "category": category, "imgUrl": imgUrl, "type": stocktype };
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