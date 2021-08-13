import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private fb: FormBuilder,
    private http: HttpClient) {
    this.registerForm = this.fb.group({
      username: new FormControl('', Validators.required),
      phoneno: new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{6,8}')]),
      remember: new FormControl(false, Validators.required)
    })
  }

  ngOnInit(): void {
  }

  register() {
    console.log("username", this.registerForm.value.username);
    console.log("phoneno", this.registerForm.value.phoneno)
    console.log("email", this.registerForm.value.email);
    console.log("password", this.registerForm.value.password);

    if (this.registerForm.value.username === null || this.registerForm.value.username.trim() === "") {
      alert("UserName is mandatory");
    }
    else if (this.registerForm.value.phoneno === null || this.registerForm.value.phoneno.trim() === "") {
      alert("Phone number is mandatory");
    }
    else if (this.registerForm.value.email === null || this.registerForm.value.email.trim() === "") {
      alert("Email Address is mandatory");
    }
    else if (this.registerForm.value.password === null || this.registerForm.value.password.trim() === "") {
      alert("Password is mandatory");
    }
    else {
      var registerObj = {
        name: this.registerForm.value.username,
        mobileNo: this.registerForm.value.phoneno,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password
      }
      console.log("registerObj", registerObj);

      const url = "https://product-mock-api.herokuapp.com/groceryapp/api/v1/auth/register";
      this.http.post(url, registerObj).subscribe((res) => {
        console.log("res", res);
        window.location.href = "/login";
      })
    }
  }
}
