import { Component, OnInit } from '@angular/core';
import { result } from 'lodash';
import { Userservice } from '../userservice';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {

  userDataList: any;


  constructor(private userService: Userservice) {
    this.userList();
  }

  userList() {

    try {

      let userList = {
        "selector": {
          "role": "user"
        },
        "fields": ["_id", "_rev", "name", "mobileNo", "email", "password", "registerDate", "account"]
      }
  
  
      this.userService.userList(userList).subscribe((res: any) => {
        this.userDataList = res.docs;
        console.log("datalist", this.userDataList);
      }, err => {
        alert("Something went wrong");
      })

    }
    catch (err) {
      console.error("error", err);
    }
  }


  changeUserStatus(users : any)
  {

    try {

      console.table(users.account);    
      users.account = "Deactive";
      users.role = "user";
  
  
      this.userService.userAccountStatus(users).subscribe((result : any) => {
        console.log("status change result", result);      
      }, err => {
        alert("Account Status Change Error")
      })
  
      this.userList();
    }
    catch(err) {
      console.error("error", err);
    }
    }
}
