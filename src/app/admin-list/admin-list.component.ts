import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent implements OnInit {

  adminDataList: any;

  
  constructor(private adminService : AdminService) 
  {
    this.adminList();
  }

  ngOnInit(): void {
  }


  adminList() {
    let adminList = {
      "selector": {
        "role": "admin"
      },
      "fields": ["_id", "_rev", "name", "mobileNo", "email", "password"]
    }


    this.adminService.listOfAdmin(adminList).subscribe((res: any) => {
      this.adminDataList = res.docs;
      console.log("Admindatalist", this.adminDataList);
    }, err => {
      alert("Register Error");
    })
  }
}