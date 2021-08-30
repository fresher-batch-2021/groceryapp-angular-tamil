import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userEmail : any;

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
    let user = localStorage.getItem("LOGGED_IN_USER");
    this.userEmail = user != null ? JSON.parse(user) : [];
    console.log("email", this.userEmail.email);

    if(this.userEmail.email != null)
    {
      this.emailValue = true;
      console.log("emailvalue", this.emailValue);
    }
  }

  ngOnInit(): void {
    console.log("active route", this.router.url);
  }

  logOut()
  {
    localStorage.removeItem("LOGGED_IN_USER");
    window.location.href = "/auth/login";
  }

  adminLogOut()
  {
    localStorage.removeItem("LOGGED_IN_ADMIN");
    window.location.href = "/auth/admin";
  }

}
