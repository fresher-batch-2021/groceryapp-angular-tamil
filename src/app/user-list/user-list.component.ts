import { Component, OnInit } from '@angular/core';
import { Userservice } from '../userservice';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  userDataList: any;


  constructor(private userService : Userservice) 
  { 
    this.userList();
  }

  ngOnInit(): void {
  }

  userList() {
    let userList = {
      "selector": {
        "role": "user"
      },
      "fields": ["_id", "_rev", "name", "mobileNo", "email", "password"]
    }


    this.userService.userList(userList).subscribe((res: any) => {
      this.userDataList = res.docs;
      console.log("datalist", this.userDataList);
    }, err => {
      alert("Register Error");
    })
  }

}
