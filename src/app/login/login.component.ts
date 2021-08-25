import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Userservice } from '../userservice';

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
  role : any;

  constructor(private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private userService : Userservice,
    private toastr: ToastrService) {
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
        "fields": ["_id", "_rev", "name","email", "password", "role"]
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

        this.userService.userLogin(loginObj).subscribe((res : any) => {
          let userData = res.docs;
          console.log("userData", userData);
          if(userData.length === 0)
          {
            // alert("Invalid Email and Password");
            this.toastr.error("Invalid Email or Password");
          }
          else
          {
            let user = userData[0];                       
            localStorage.setItem("LOGGED_IN_USER", JSON.stringify(user));
            window.location.href = "/home";
            // this.router.navigate(["/home"]);
            // alert("Login Successfully");
            this.toastr.success("Login Successfully");
          }
        }, err => {
          // alert("Invalid Username or Password");
          this.toastr.error("Invalid Email or Password");
        })
      }
    }
  }
}
