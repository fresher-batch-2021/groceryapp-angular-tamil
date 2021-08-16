import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  email: any;
  password: any;
  remember: any;

  constructor(private fb: FormBuilder,
    private router: Router,
    private http: HttpClient) {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      password: new FormControl('', [Validators.required, Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{6,8}')]),
      remember: new FormControl(false, Validators.required)
    })
  }

  ngOnInit(): void {
  }

  login() {
    console.log("login res", this.loginForm.value);

    this.email = this.loginForm.value.email;
    this.password = this.loginForm.value.password;
    this.remember = this.loginForm.value.remember;

    if (this.loginForm.value.email === null || this.loginForm.value.email.trim() === "") {
      alert("Email Address is Invalid");
    }
    else if (this.loginForm.value.password === null || this.loginForm.value.password.trim() === "") {
      alert("Password is Invalid");
    }
    else {
      const loginObj = {
        "selector": {
          "email": this.loginForm.value.email,
          "password": this.loginForm.value.password
        },
        "fields": ["_id", "_rev", "name","email", "password"]
      }

      if (this.loginForm.value.email === null || this.loginForm.value.email.trim() == "") {
        alert("Email is mandatory");
      }
      else if (this.loginForm.value.password === null || this.loginForm.value.password.trim() === "") {
        alert("Password is mandatory");
      }
      else if (this.loginForm.value.password >= 6 || this.loginForm.value.password <= 8) {
        alert("Password minimum 6 to 8 characters");
      }
      else {

        const dbUsername = "apikey-v2-1xzbb618xtgfg14nm7uasm9coajsc9dzzpg8p57atbtg";
        const dbPassword = "f56766c5716a7b37a531aaa7bdb53315";
        const basicAuth = "Basic " + btoa(dbUsername + ":" + dbPassword);

        // console.log("loginObj", loginObj);

        // const url = "https://product-mock-api.herokuapp.com/groceryapp/api/v1/auth/login";
        const url = "https://8ca8138b-1aac-430a-8325-3a686242a515-bluemix.cloudantnosqldb.appdomain.cloud/grocerystoreapp_users/_find";
        this.http.post(url, loginObj, { headers: { Authorization: basicAuth } }).subscribe((res : any) => {
          let userData = res.docs;
          console.log("userData", userData);
          if(userData.length === 0)
          {
            alert("Invalid Email and Password");
          }
          else
          {
            localStorage.setItem("emailAddress", this.email);
            window.location.href = "/home";
            alert("Login Successfully");
          }
        }, err => {
          alert("Invalid Username or Password");
        })
      }
    }
  }
}
