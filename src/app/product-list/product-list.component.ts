import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { ProductsService } from '../products.service';
import { SearchPipe } from '../search.pipe';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productList: any;

  selectedCategory: any;

  ascProductList: any;

  constructor(private productService : ProductsService) 
  { 
    this.getAllProducts();
  }

  ngOnInit(): void {
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
