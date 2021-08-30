import { Component } from '@angular/core';
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

  constructor(private productService : ProductsService) 
  { 
    this.getAllProducts();
  }


  categories:any;
  searchResults:any;
  getAllProducts()
  {
    this.productService.getAllProducts().subscribe((res: any) => {
      let data = res.rows;
      this.productList = data.map((obj: any) => obj.doc)
      
      this.categories = _.uniq(this.productList.map((obj:any)=>obj.category));
      console.log("productList", this.productList);
      this.ascProductList = _.orderBy(this.productList, ['category'], ['asc']);
      console.log("Ascending Product List  :", this.ascProductList);
    })
  }
}
