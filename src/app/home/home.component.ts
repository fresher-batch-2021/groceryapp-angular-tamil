import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  product : any;
  unit : any;
  price : any;


  constructor(private router: Router,
    private http : HttpClient) 
    {
      this.getProduct();
    }

    products:any;
  ngOnInit(): void {
  }

  gotoCart(productName:string,price:number){
    this.router.navigateByUrl("ordernow?productName=Apple&Kg=1&price=120");
  }

  getProduct()
  {
    const url = "assets/products.json";
    this.http.get(url).subscribe((res) => {
      this.products = res;
      console.log(this.products);
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

  getProductItems(category:any){
    return this.products[category];
  }

  addCart(product : string, unit : number, type : string, price : string)
  {
    console.log("product :", product);
    console.log("unit :", unit);
    console.log("type :", type)
    console.log("price :", price);
    this.product = product;
    this.unit = unit;
    this.price = price;
    this.router.navigateByUrl("ordernow?productName="+this.product+"&Kg="+this.unit+"&price="+this.price);

  }
}
