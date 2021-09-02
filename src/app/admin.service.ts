import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {


  collectionName = "grocerystoreapp_admin"
  basicAuth = "Basic " + btoa(environment.dbUsername + ":" + environment.dbPassword);

  constructor(private http: HttpClient) { }

  listOfAdmin(adminList: any) {
    return this.http.post(environment.url + this.collectionName + "/_find", adminList)
  }
}
