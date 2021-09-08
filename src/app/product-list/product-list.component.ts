import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {

  productList: any;

  selectedCategory: any;

  ascProductList: any;

  constructor(private productService : ProductsService,
    private router : Router) 
  { 
    this.getAllProducts();
  }


  categories:any;
  searchResults:any;
  getAllProducts()
  {
    this.productService.getAllProducts().subscribe((res: any) => {

      console.log(res.docs);
      let data = res.docs;
      // this.productList = data.map((obj: any) => obj.doc)
      
      this.categories = _.uniq(data.map((obj:any)=>obj.category));
      this.ascProductList = _.orderBy(data, ['category'], ['asc']);
      console.log("asd", this.ascProductList);
    })
  }


  editProduct(list : any)
  {
    localStorage.setItem("updateProduct",JSON.stringify(list));
    this.router.navigate(["/adminPanel/updateProduct"]);
  }
}
