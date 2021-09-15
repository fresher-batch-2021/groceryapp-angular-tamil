import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from '../products.service';

export interface DialogData {
  // animal: string;
  // name: string;
  index:number;
    product: any;
}

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  updateProductForm: FormGroup;

  selectedProduct:any;

  getUpdateProduct : any;
  getUpdateDetails : any;

  updateId : any;
  updateRev : any;
  updateProductName : any;
  updateUnit : any;
  updateType : any;
  updateCategory : any;
  updatePrice : any;
  updateImageUrl : any;
  updateStock : any;

  constructor(private fb: FormBuilder ,
    private router : Router,
    private productService :  ProductsService,
    private toastr : ToastrService,
    public dialogRef: MatDialogRef<UpdateProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) 
  { 
    console.log("date list", this.data);
    this.selectedProduct =  this.data["product"];
    
    // this.getUpdateProduct = localStorage.getItem("updateProduct");
    // this.getUpdateDetails = this.getUpdateProduct != null ? JSON.parse(this.getUpdateProduct) : [];
    // console.table("editProductDetails", this.getUpdateDetails._id);


    // this.updateId = this.getUpdateDetails._id;
    // this.updateRev = this.getUpdateDetails._rev;
    // this.updateProductName = this.getUpdateDetails.name;
    // this.updateUnit = this.getUpdateDetails.unit;
    // this.updateType = this.getUpdateDetails.type;
    // this.updateCategory = this.getUpdateDetails.category;
    // this.updatePrice = this.getUpdateDetails.price;
    // this.updateImageUrl = this.getUpdateDetails.imageUrl; 
    // this.updateStock = this.getUpdateDetails.stock;   

    
    this.updateId = this.data.product._id;
    this.updateRev = this.data.product._rev;
    this.updateProductName = this.data.product.name;
    this.updateUnit = this.data.product.unit;
    this.updateType = this.data.product.type;
    this.updateCategory = this.data.product.category;
    this.updatePrice = this.data.product.price;
    this.updateImageUrl = this.data.product.imageUrl; 
    this.updateStock = this.data.product.stock;  



    this.updateProductForm = this.fb.group({
      productName: new FormControl("", Validators.required),
      unit: new FormControl("", Validators.required),
      type: new FormControl("", Validators.required),
      category: new FormControl("", Validators.required),
      price: new FormControl("", Validators.required),
      stock : new FormControl("", Validators.required),
      imgUrl: new FormControl("", Validators.required)

    })
  }

  ngOnInit(): void {
  }

  updateProduct()
  {

    try {      

    let updateProductObj = {
      _rev: this.data.product._rev,
      name: this.updateProductForm.value.productName,
      price: this.updateProductForm.value.price,
      unit: this.updateProductForm.value.unit,
      type: this.updateProductForm.value.type,
      category: this.updateProductForm.value.category,
      imageUrl: this.updateProductForm.value.imgUrl,
      stock: this.updateProductForm.value.stock
    }
    console.log("obj", updateProductObj);

    this.productService.updateProducts(this.updateId, updateProductObj).subscribe((res : any) => {
      this.toastr.success("Product Update Successfully");
      
      // this.router.navigate(["/adminPanel/product/productList"]);

      this.dialogRef.close( { index: this.data.index, modified: true, data: updateProductObj});
    }, err => {
      this.toastr.error("Product Update Failure");
    })
    
    } catch (err) {
      console.error("error", err);
    }

  }



  // onNoClick(): void {
  //   this.dialogRef.close();
  // }
}
