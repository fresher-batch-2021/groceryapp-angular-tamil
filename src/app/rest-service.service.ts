import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestServiceService {


  constructor(private http: HttpClient) 
  { 
    
  }

  findAll(collectionName:string) {
    const url = environment.url + collectionName + "/_all_docs?include_docs=true";
    return this.http.get( url)
  }

  findOne(collectionName:string, id:string) {
    const url = environment.url + collectionName + "/"+ id;
    return this.http.get( url)
  }

  
  findByCriteria(collectionName:string, criteria: any) {
    const url = environment.url + collectionName + "/_find";
    return this.http.post( url, criteria)
  }

  save(collectionName:string, data: any) {
    const url = environment.url + collectionName ;
    return this.http.post( url, data)
  }

  deleteOne(collectionName:string, id:string, rev:string) {
    const url = environment.url + collectionName + "/"+ id + "?rev="+ rev;
    return this.http.delete( url)
  }

  updateOne(collectionName:string, id:string, data:any) {
    const url = environment.url + collectionName + "/"+ id ;
    return this.http.put( url, data )
  }
}
