import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginDTO } from '../class-folder/login-dto';
import { RestServiceService } from './rest-service.service';

@Injectable({
  providedIn: 'root',
})
export class Userservice {
  loginSubject = new BehaviorSubject<any>(this.getUser());

  collectionName = 'grocerystoreapp_users';
  basicAuth =
    'Basic ' + btoa(environment.dbUsername + ':' + environment.dbPassword);

  constructor(private http: HttpClient, private restService: RestServiceService) {}

  userLogin(loginDTO: LoginDTO) {
    const loginObj = {
      selector: {
        email: loginDTO.email,
        password: loginDTO.password,
      },
      fields: ['_id', '_rev', 'name', 'email', 'password', 'role', 'account'],
    };

    //return this.http.post(environment.url + this.collectionName + "/_find", loginObj, { headers: { Authorization: this.basicAuth } })
    return this.http.post(
      environment.url + this.collectionName + '/_find',
      loginObj
    );
  }

  userRegister(registerObj: any) {
    // return this.http.post(environment.url + this.collectionName, registerObj);
      return this.restService.save(this.collectionName, registerObj);
  }

  userList(userList: any) {
    // return this.http.post(environment.url + this.collectionName + '/_find',userList);
      return this.restService.findByCriteria(this.collectionName, userList);
  }

  getAllUsers() {
   
    let getUserObj = {
      selector: {

      },
      sort: [{ registerDate: 'desc' }],
    };
    // return this.http.post(environment.url + this.collectionName + '/_find', getUserObj);
      return this.restService.findByCriteria(this.collectionName, getUserObj);
  }

  getUser() {
    let admin = localStorage.getItem('LOGGED_IN_USER');
    if (admin) {
      return JSON.parse(admin);
    }
    return null;
  }


  userAccountStatus(users : any)
  {
    console.log("users", users);
    // return this.http.put(environment.url + this.collectionName+ "/" + users._id + "?rev=" + users._rev, users);
      return this.restService.updateOne(this.collectionName, users._id, users);
  }
}
