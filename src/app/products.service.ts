import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RestServiceService } from './rest-service.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  collectionName = "grocerystoreapp_products";
  // basicAuth = "Basic " + btoa(environment.dbUsername + ":" + environment.dbPassword);

  constructor(private http: HttpClient, private restService: RestServiceService) { }

  getAllProducts() {

    let availableProducts = {
      "selector" : {
         
      }  
    };  
      // return this.http.post(environment.url + this.collectionName + "/_find", availableProducts)
        return this.restService.findByCriteria(this.collectionName, availableProducts)
    
  }

  getAvailableProducts() {

    let availableProducts = {
      "selector" : {
          "stock": {
              "$gt": 0
          }
      }    
  }
    // return this.http.post(environment.url + this.collectionName + "/_find", availableProducts)
      return this.restService.findByCriteria(this.collectionName, availableProducts);
  }

  getProduct(id:string) {
    // return this.http.get(environment.url + this.collectionName + "/"+ id);
      return this.restService.findOne(this.collectionName, id);
  }

  addNewProducts(addProductObj: any) {
    // return this.http.post(environment.url + this.collectionName, addProductObj);
      return this.restService.save(this.collectionName, addProductObj);
  }

  removeProducts(id: any, rev: any) {
    // return this.http.delete(environment.url + this.collectionName + "/" + id + "?rev=" + rev)
      return this.restService.deleteOne(this.collectionName, id, rev);
  }

  updateProducts(id : any, updateProductObj : any)
  {
    // return this.http.put(environment.url + this.collectionName + "/" + id + "?rev=" + rev, updateProductObj);
      return this.restService.updateOne(this.collectionName, id, updateProductObj);
  }

  updateProuductsStock(product:any)
  {

    // return this.http.put(environment.url + this.collectionName + "/" + product._id , product);
      return this.restService.updateOne(this.collectionName, product._id, product);
  }
}
