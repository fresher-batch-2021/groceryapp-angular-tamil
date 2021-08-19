import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Userservice } from '../userservice';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  userDataList: any;

  constructor(private fb: FormBuilder,
    private http: HttpClient,
    private userService: Userservice) {
    this.registerForm = this.fb.group({
      username: new FormControl('', [Validators.required, Validators.minLength(8)]),
      phoneno: new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      password: new FormControl('', [Validators.required, Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{6,8}')]),
      remember: new FormControl(false, Validators.required)
    })

    this.userList();
  }

  ngOnInit(): void {
  }

  register() {
    console.log("username", this.registerForm.value.username);
    console.log("phoneno", this.registerForm.value.phoneno)
    console.log("email", this.registerForm.value.email);
    console.log("password", this.registerForm.value.password);


    var registerObj = {
      name: this.registerForm.value.username,
      mobileNo: this.registerForm.value.phoneno,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      role: "user"
    }
    console.log("registerObj", registerObj);

    this.userService.userRegister(registerObj).subscribe((res: any) => {
      console.log("res", res);
      window.location.href = "/login";
    }, err => {
      alert("Register Error");
    })
  }

  userList() {
    let userList = {
      "selector": {
        "role": "user"
      },
      "fields": ["_id", "_rev", "name", "mobileNo", "email", "password"]
    }


    this.userService.userList(userList).subscribe((res: any) => {
      // console.log("res", res.docs);
      this.userDataList = res.docs;
      console.log("datalist", this.userDataList);
    }, err => {
      alert("Register Error");
    })
  }
}
