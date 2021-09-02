import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginDTO } from './login-dto';

@Injectable({
  providedIn: 'root'
})
export class Userservice {

  collectionName = "grocerystoreapp_users";
  basicAuth = "Basic " + btoa(environment.dbUsername + ":" + environment.dbPassword);


  constructor(private http: HttpClient) { }

  userLogin(loginDTO: LoginDTO)  {

    const loginObj = {
      "selector": {
        "email": loginDTO.email,
        "password": loginDTO.password
      },
      "fields": ["_id", "_rev", "name","email", "password", "role"]
    }

    //return this.http.post(environment.url + this.collectionName + "/_find", loginObj, { headers: { Authorization: this.basicAuth } })
    return this.http.post(environment.url + this.collectionName + "/_find", loginObj)
  }

  userRegister(registerObj: any) {
    return this.http.post(environment.url + this.collectionName, registerObj)
  }

  userList(userList: any) {
    return this.http.post(environment.url + this.collectionName + "/_find", userList)
  }
}
