import { Injectable } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
import { ApiService } from './api.service';
import { usersDescriptor } from '../types/user.type';
import { Observable } from 'rxjs';

@Injectable()
export class UsersService {

    
    endpoint_url:string = 'users';

    constructor(private _api_service: ApiService) { 

    }

    getUser(user:string):Observable<usersDescriptor>{
    return this._api_service.get(this.endpoint_url+'/',user).pipe(map(
      (data) => {
        return usersDescriptor.import(data);
      }
    ));
    }

    //should I foreach and import like userDescriptor data here? or in component?
    getUsers():Observable<any>{
      return this._api_service.get(this.endpoint_url).pipe(map(
        (data) => {
          return data;
        }
      ));
      }


}