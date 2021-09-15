import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { MaterialModalComponent } from '../material-modal/material-modal.component';
import { ProductsService } from '../products.service';
import { UpdateProductComponent } from '../update-product/update-product.component';

export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {

  animal!: string;
  name!: string;
  product!: any;

  productList: any;

  selectedCategory: any;

  ascProductList: any;

  constructor(private productService : ProductsService,
    private router : Router,
    public dialog: MatDialog) 
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
      this.productList = data;
      
      this.groupByProducts();
      console.log("asd", this.ascProductList);
      
    })
  }


  groupByProducts(){
    this.categories = _.uniq(this.productList.map((obj:any)=>obj.category));
    this.ascProductList = _.orderBy(this.productList, ['category'], ['asc']);
   
  }


  // editProduct(list : any)
  // {
  //   localStorage.setItem("updateProduct",JSON.stringify(list));
  //   this.router.navigate(["/adminPanel/updateProduct"]);
  // }


  openDialog(index:number, product : any): void {
    console.log("Modify:", product);
    const dialogRef = this.dialog.open(UpdateProductComponent, {
      width: '70%', height: '80%', 
      data: {
        // name: this.name, animal: this.animal
        index: index,
        product : product
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' , result);   
      if(result && result.modified) {   
          console.log(this.ascProductList[result.index]);
          this.ascProductList[result.index] = result.data;
       //   this.groupByProducts();
         // this.getAllProducts();
      }
    });
  }

}
