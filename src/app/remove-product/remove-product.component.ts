import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-remove-product',
  templateUrl: './remove-product.component.html',
  styleUrls: ['./remove-product.component.css']
})
export class RemoveProductComponent implements OnInit {

  productList: any;

  constructor(private productService : ProductsService) 
  { 
    this.getAllProducts();
  }

  ngOnInit(): void {
  }

  getAllProducts()
  {
    this.productService.getAllProducts().subscribe((res: any) => {
      let data = res.rows;
      this.productList = data.map((obj: any) => obj.doc)
      console.log("productList", this.productList);
    })
  }

  removeProduct(id: any, rev: any) {
    console.log("id", id);
    console.log("rev", rev);
    this.productService.removeProducts(id, rev).subscribe((res) => {
      console.log("remove products result", res);
      document.location.reload();
    }, err => {
      console.log("err Message", err);
    })
  }
}
