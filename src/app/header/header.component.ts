import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  email : any;
  adminEmail : any;
  adminEmailValue = false;
  emailValue = false;

  constructor(private router : Router) 
  {
    let admin = localStorage.getItem("LOGGED_IN_ADMIN");
    this.adminEmail = admin != null ? JSON.parse(admin) : [];
    console.log("adminEmail", this.adminEmail);

    if(this.adminEmail.email != null)
    {
      this.adminEmailValue = true;
      console.log("adminemail", this.adminEmail.email);
    }
    this.email = localStorage.getItem("emailAddress");
    console.log("email", this.email);

    if(this.email != null)
    {
      this.emailValue = true;
      console.log("emailvalue", this.emailValue);
    }
  }

  ngOnInit(): void {
  }

  logOut()
  {
    localStorage.removeItem("emailAddress");
    window.location.href = "/login";
  }

  adminLogOut()
  {
    localStorage.removeItem("LOGGED_IN_ADMIN");
    window.location.href = "/admin";
  }

}
