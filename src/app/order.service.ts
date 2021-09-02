import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  collectionName = "grocerystoreapp_order"
  basicAuth = "Basic " + btoa(environment.dbUsername + ":" + environment.dbPassword);


  constructor(private http: HttpClient) { }


  placeOrder(orderData: any) {
    return this.http.post(environment.url + this.collectionName, orderData)
  }

  OrderList() {
    return this.http.get(environment.url + this.collectionName + "/_all_docs?include_docs=true")
  }

  getMyOrders(query: any) {

    return this.http.post(environment.url + this.collectionName + "/_find", query)
  }

  updateStatus(order: any) {
    return this.http.put(environment.url + this.collectionName + "/" + order._id + "?rev=" + order._rev, order)
  }

}
