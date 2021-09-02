import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  collectionName = "grocerystoreapp_products";
  basicAuth = "Basic " + btoa(environment.dbUsername + ":" + environment.dbPassword);

  constructor(private http: HttpClient) { }

  getAllProducts() {
    return this.http.get(environment.url + this.collectionName + "/_all_docs?include_docs=true")
  }

  addNewProducts(addProductObj: any) {
    return this.http.post(environment.url + this.collectionName, addProductObj)
  }

  removeProducts(id: any, rev: any) {
    return this.http.delete(environment.url + this.collectionName + "/" + id + "?rev=" + rev)
  }
}
