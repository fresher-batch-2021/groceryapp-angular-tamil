import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  email : any;

  emailValue = false;

  constructor(private router : Router) 
  {
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

}
