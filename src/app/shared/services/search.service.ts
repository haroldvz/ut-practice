import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpParams } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  endpoint_url:string = 'search';

  constructor(private _api_service: ApiService) { }



  search(what: string, params: HttpParams){
    return this._api_service.get(`${this.endpoint_url}/${what}`,'',params).pipe(map(
      (data) => {
        return data;
      }
    ));
  }


}
