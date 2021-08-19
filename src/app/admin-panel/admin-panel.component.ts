import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../admin.service';
import { OrderService } from '../order.service';
import { ProductsService } from '../products.service';
import { Userservice } from '../userservice';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  userDataList: any;
  adminDataList: any;
  addProductToList : any;


  listUsersForm: FormGroup;

  addProductForm : FormGroup;

  userType: any;

  productList: any;
  placeOrderList: any;

  itemList: any;

  productname : any;
  proItems : any;


  constructor(private http: HttpClient, private fb: FormBuilder,
    private adminService: AdminService,
    private userService : Userservice,
    private productService : ProductsService,
    private orderSerive : OrderService) 
    {

    this.listUsersForm = this.fb.group({
      result: new FormControl('', Validators.required)
  
    })

    this.addProductForm = this.fb.group({
      productName : new FormControl("", Validators.required),
      unit : new FormControl("", Validators.required),
      type : new FormControl("", Validators.required),
      price : new FormControl("", Validators.required),
      imgUrl : new FormControl("", Validators.required)

    })

    this.userList();
    this.adminList();

  }

  ngOnInit(): void { }


  userList() {
    let userList = {
      "selector": {
        "role": "user"
      },
      "fields": ["_id", "_rev", "name", "mobileNo", "email", "password"]
    }


    this.userService.userList(userList).subscribe((res: any) => {
      this.userDataList = res.docs;
      console.log("datalist", this.userDataList);
    }, err => {
      alert("Register Error");
    })
  }


  adminList() {
    let adminList = {
      "selector": {
        "role": "admin"
      },
      "fields": ["_id", "_rev", "name", "mobileNo", "email", "password"]
    }


    this.adminService.listOfAdmin(adminList).subscribe((res: any) => {
      this.adminDataList = res.docs;
      console.log("Admindatalist", this.adminDataList);
    }, err => {
      alert("Register Error");
    })
  }

  radioValues() {
    console.log("radio", this.listUsersForm.value);
    this.userType = this.listUsersForm.value.result;
    console.log("usertype", this.userType);

    if(this.userType == "productList" ||this.userType == "removeProduct")
    {
      this.productService.getAllProducts().subscribe((res : any) => {
        let data = res.rows;        
       this.productList = data.map((obj : any) => obj.doc)
        console.log("productList", this.productList);
      })
    }

    if(this.userType == "placeOrders")
    {      
      this.orderSerive.OrderList().subscribe((res : any) => {        
        let row = res.rows;                
        let docs = row.map((obj : any) => obj.doc);        
        this.placeOrderList = docs;
        console.log("placeOrderList", this.placeOrderList);   
      })
    }
  }

  addProduct()
  {
    console.log("addProduct", this.addProductForm.value);
  }

  changeDelivered(id : any, rev : any)
  {
    console.log("id :", id);
    console.log("rev", rev);

    // this.proItems = this.placeOrderList.map((obj : any) => obj.items)
    // console.log("proitems", this.proItems);

  }

  removeProduct(id : any, rev : any)
  {
    console.log("id",id);
    console.log("rev", rev);
    this.productService.removeProducts(id , rev).subscribe((res) => {
      console.log("remove products result", res);
    }, err => {
      console.log("err Message", err);
    })
  }
}
