import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpParams } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
import { searchDescriptor } from '../types/search.type';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SearchService {

  endpoint_url:string = 'search';
  readonly WHAT = ['repositories', 'commits', 'code', 'issues', 'users'];

  constructor(private _api_service: ApiService) { }

  searchSomething(what: string, params: HttpParams):Observable<searchDescriptor>{
    const param = params.get('q');
    if (this.WHAT.indexOf(what) === -1 || param == '') {
      return throwError(`Searching for ${what} is not supported. The available types are: ${this.WHAT.join(', ')}.`);
    }
    return this._api_service.get(`${this.endpoint_url}/${what}`,'',params).pipe(map(
      (data) => {
        return searchDescriptor.import(data);
      }
    ));
  }


}
