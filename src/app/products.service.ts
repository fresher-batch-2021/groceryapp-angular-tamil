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

    let avaliableProducts = {
      "selector" : {
         
      }  
    };  
      return this.http.post(environment.url + this.collectionName + "/_find", avaliableProducts)
    
  }

  getAvailableProducts() {

    let avaliableProducts = {
      "selector" : {
          "stock": {
              "$gt": 0
          }
      }    
  }
    return this.http.post(environment.url + this.collectionName + "/_find", avaliableProducts)
  }

  getProduct(id:string) {
    return this.http.get(environment.url + this.collectionName + "/"+ id)
  }

  addNewProducts(addProductObj: any) {
    return this.http.post(environment.url + this.collectionName, addProductObj)
  }

  removeProducts(id: any, rev: any) {
    return this.http.delete(environment.url + this.collectionName + "/" + id + "?rev=" + rev)
  }

  updateProducts(id : any, rev : any,updateProductObj : any)
  {
    return this.http.put(environment.url + this.collectionName + "/" + id + "?rev=" + rev, updateProductObj)
  }

  updateProuductsStock(product:any)
  {

    return this.http.put(environment.url + this.collectionName + "/" + product._id , product)
  }
}
