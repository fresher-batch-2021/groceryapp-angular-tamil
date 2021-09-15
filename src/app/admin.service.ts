import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RestServiceService } from './rest-service.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {


  collectionName = "grocerystoreapp_admin"
  // basicAuth = "Basic " + btoa(environment.dbUsername + ":" + environment.dbPassword);

  constructor(private http: HttpClient, private restService: RestServiceService) { }

  listOfAdmin(adminList: any) {
    // return this.http.post(environment.url + this.collectionName + "/_find", adminList);
    return  this.restService.findByCriteria(this.collectionName , adminList);
  }
}
