import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm : FormGroup;

  constructor(private fb : FormBuilder) 
  {
    this.registerForm = this.fb.group({
      username : new FormControl('', Validators.required),
      phoneno : new FormControl('', Validators.required),
      email : new FormControl('', [Validators.required, Validators.email]),
      password : new FormControl('', [Validators.required, Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{6,8}')]),
      remember : new FormControl(false, Validators.required)
    })
   }

  ngOnInit(): void {
  }

  register()
  {
    console.log("res", this.registerForm.value);
    console.log("email", this.registerForm.value.email);
    console.log("password", this.registerForm.value.password);
  }
}
