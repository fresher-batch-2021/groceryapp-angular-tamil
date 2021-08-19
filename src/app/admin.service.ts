import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  dbUsername = "apikey-v2-1xzbb618xtgfg14nm7uasm9coajsc9dzzpg8p57atbtg";
  dbPassword = "f56766c5716a7b37a531aaa7bdb53315";
  basicAuth = "Basic " + btoa(this.dbUsername + ":" + this.dbPassword);

  url = "https://8ca8138b-1aac-430a-8325-3a686242a515-bluemix.cloudantnosqldb.appdomain.cloud/grocerystoreapp_admin";

  constructor(private http : HttpClient) { }

  listOfAdmin(adminList : any)
  {
    return this.http.post(this.url+"/_find", adminList, { headers: { Authorization: this.basicAuth } })
  }
}
