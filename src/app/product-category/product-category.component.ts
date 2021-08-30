import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartServiceService } from '../cart-service.service';
import { ProductsService } from '../products.service';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';

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

    this.productService.getAllProducts().subscribe((res: any) => {
      let data: any = res.rows;

      this.products = data.map((obj: any) => obj.doc);
      console.log("pro", this.products);

      this.categories = _.groupBy(this.products, 'category');
      console.log("categories", this.categories[this.viewCategory]);
      this.items = this.categories[this.viewCategory];
      console.log("items", this.items);

    })
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

  isItemAdded(productName: string) {

    return this.itemslist.find((obj: any) => obj.productName == productName) != null;
  }


}
