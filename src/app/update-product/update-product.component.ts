import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  updateProductForm: FormGroup;

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
    private toastr : ToastrService) 
  { 

    this.getUpdateProduct = localStorage.getItem("updateProduct");
    this.getUpdateDetails = this.getUpdateProduct != null ? JSON.parse(this.getUpdateProduct) : [];
    console.table("editProductDetails", this.getUpdateDetails);


    this.updateId = this.getUpdateDetails._id;
    this.updateRev = this.getUpdateDetails._rev;
    this.updateProductName = this.getUpdateDetails.name;
    this.updateUnit = this.getUpdateDetails.unit;
    this.updateType = this.getUpdateDetails.type;
    this.updateCategory = this.getUpdateDetails.category;
    this.updatePrice = this.getUpdateDetails.price;
    this.updateImageUrl = this.getUpdateDetails.imageUrl; 
    this.updateStock = this.getUpdateDetails.stock;   

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
    // console.log("updateProduct Form values", this.updateProductForm.value);
    // console.log("productName", this.updateProductForm.value.productName);
    // console.log("unit", this.updateProductForm.value.unit);
    // console.log("type", this.updateProductForm.value.type);
    // console.log("category", this.updateProductForm.value.category);
    // console.log("price", this.updateProductForm.value.price);
    // console.log("imgUrl", this.updateProductForm.value.imgUrl);


    let updateProductObj = {
      name: this.updateProductForm.value.productName,
      price: this.updateProductForm.value.price,
      unit: this.updateProductForm.value.unit,
      type: this.updateProductForm.value.type,
      category: this.updateProductForm.value.category,
      imageUrl: this.updateProductForm.value.imgUrl,
      stock: this.updateProductForm.value.stock
    }
    console.log("obj", updateProductObj);

    this.productService.updateProducts(this.updateId, this.updateRev, updateProductObj).subscribe((res : any) => {
      this.toastr.success("Product Update Successfully");
      this.router.navigate(["/adminPanel/product/productList"]);
    }, err => {
      this.toastr.error("Product Update Failure");
    })

  }
}
