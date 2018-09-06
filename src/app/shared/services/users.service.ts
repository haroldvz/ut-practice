import { Injectable } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
import { ApiService } from './api.service';
import { usersDescriptor } from '../types/user.type';

@Injectable()
export class UsersService {

    
    endpoint_url:string = 'users/';

    constructor(private _api_service: ApiService) { 

    }

    getUser(user:string){
    return this._api_service.get(this.endpoint_url,user).pipe(map(
      (data) => {
        console.log(data);
        //return usersDescriptor.import(data);
        return data;
      }
    ));
    }


    getUsers(){
      return this._api_service.get(this.endpoint_url).pipe(map(
        (data) => {
          console.log(data);
          //return usersDescriptor.import(data);
          return data;
        }
      ));
      }


}