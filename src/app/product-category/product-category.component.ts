import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartServiceService } from '../cart-service.service';
import { ProductsService } from '../products.service';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { Productdto } from 'src/class-folder/productdto';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {

  products: any;
  categories: any;

  view: any;
  viewCategory: any;
  items: any;

  selectedCategory: any;

  totalPrice: any;
  itemslist: any = [];

  constructor(private route: ActivatedRoute,
    private productService: ProductsService,
    private cartService: CartServiceService,
    private toastr: ToastrService) {
    this.viewCategory = this.route.snapshot.params["category"];
    console.log("view", this.viewCategory);
    this.getProduct();
  }

  ngOnInit(): void {
    this.itemslist = this.cartService.getCartItems();
  }




  getProduct() {

    try {
      
      this.productService.getAvailableProducts().subscribe((res: any) => {
        let data: Productdto[] = res.docs;
  
        // this.products = data.map((obj: any) => obj.doc);
        // console.log("pro", this.products);
  
        this.categories = _.groupBy(data, 'category');
        console.log("categories", this.categories[this.viewCategory]);
        this.items = this.categories[this.viewCategory];
        console.log("items", this.items);
  
      })

    } catch (err) {
      
      console.error("error", err);
    }
  }

  addCart(id: string, rev: string, productName: string, qty: number, type: string, price: number, stock : number, category : string, imgUrl : string, stocktype : string) {
    console.log("id", id);
    console.log("product :", productName);
    console.log("unit :", qty);
    console.log("type :", type)
    console.log("price :", price);


    this.toastr.success("Product Added");
    this.totalPrice = qty * price;
    var itemObj = { "id": id, "rev": rev, "productName": productName, "unit": qty, "price": price, "totalPrice": this.totalPrice, "stock": stock, "category": category, "imgUrl": imgUrl, "type": stocktype };
    console.log(itemObj);


    this.cartService.addItemToCart(itemObj);
    this.itemslist = this.cartService.getCartItems();
  }

  isItemAdded(productName: string) {

    return this.itemslist.find((obj: any) => obj.productName == productName) != null;
  }


}
