import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CartServiceService } from '../cart-service.service';
import { User } from '../user';
import { Userservice } from '../userservice';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user!:Observable<User>;

  cartObj : Observable<any>;

  userEmail : any;

  constructor(private router : Router,
    private userService : Userservice,
    private cartService : CartServiceService) 
  {
    this.user = userService.loginSubject;
    this.cartObj = cartService.cartCount;
    
  }

  ngOnInit(): void {
    console.log("active route", this.router.url);
  }

  logOut()
  {
    this.userService.loginSubject.next(null);
    localStorage.removeItem("LOGGED_IN_USER");
    window.location.href = "/auth/login";
  }

  adminLogOut()
  {
    localStorage.removeItem("LOGGED_IN_ADMIN");
    window.location.href = "/auth/admin";
  }

}
