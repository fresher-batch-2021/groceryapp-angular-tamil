import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  addProductForm: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder,
    private productService: ProductsService,
    private toastr : ToastrService) {
    this.addProductForm = this.fb.group({
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
    console.log("Form Value", this.addProductForm.value);
  }

  addProduct() {
   
    try {
      
      console.log("addProduct", this.addProductForm.value);

      let addProductObj = {
        "name": this.addProductForm.value.productName,
        "price": this.addProductForm.value.price,
        "stock": this.addProductForm.value.stock,
        "unit": this.addProductForm.value.unit,
        "type": this.addProductForm.value.type,
        "category": this.addProductForm.value.category,
        "imageUrl": this.addProductForm.value.imgUrl
      }
      console.log("addProductObj", addProductObj);
  
      this.productService.addNewProducts(addProductObj).subscribe((res: any) => {
        this.toastr.success("Product added successfully");
        console.log("addNewProducts Result", res);
        window.location.reload();
      }, err => {
        console.log("err Message", err);
      })
      
    } catch (err) 
    {
      console.error("error", err);  
    }
  }

}
