import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpParams } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
import { searchDescriptor } from '../types/search.type';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SearchService {

  endpoint_url:string = 'search';

  constructor(private _api_service: ApiService) { }

  searchSomething(what: string, params: HttpParams):Observable<searchDescriptor>{
    return this._api_service.get(`${this.endpoint_url}/${what}`,'',params).pipe(map(
      (data) => {
        return searchDescriptor.import(data);
      }
    ));
  }


}
