import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  adminloginForm: FormGroup;

  constructor(private fb : FormBuilder,
    private adminservice : AdminService) {
    this.adminloginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      password: new FormControl('', [Validators.required, Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{6,8}')]),
      remember: new FormControl(false, Validators.required)
    })
   }

  ngOnInit(): void {
  }


  login()  
  {
    console.log("AdminRegisterForm :", this.adminloginForm.value);

    let adminLoginObj = {
      "selector": {
          "email": this.adminloginForm.value.email,
          "password": this.adminloginForm.value.password,
          "role": "admin"
      },
      "fields": [
          "_id",
          "_rev",
          "name",
          "email",
          "password"
      ]
  }
    this.adminservice.listOfAdmin(adminLoginObj).subscribe((res : any) => {
      console.log("res", res.docs);
      let data = res.docs;
      if(data.length === 0)
      {
        alert("Invalid Email or Password");
      }
      else
      {
        window.location.href = "/adminPanel";
        alert("Login Successfully");
      }
    })
  }
}
