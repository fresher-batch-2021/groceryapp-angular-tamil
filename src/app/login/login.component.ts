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
      email: new FormControl('', [Validators.required, Validators.email]),
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

    const loginObj = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }
    console.log("loginObj", loginObj);

    const url = "https://product-mock-api.herokuapp.com/groceryapp/api/v1/auth/login";
    this.http.post(url, loginObj).subscribe((res) => {
      console.log("res", res);
      localStorage.setItem("emailAddress", this.email);
      this.router.navigate(["/home"]);
      alert("Login Successfully");
    })

  }
}
