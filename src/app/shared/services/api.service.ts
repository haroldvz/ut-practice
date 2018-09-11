import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  api_url = environment.api_url;
  
  constructor(private _http: HttpClient) { }

  /**
   *
   *
   * @param {string} [url='']
   * @param {string} [args='']
   * @returns
   * @memberof ApiService
   */
  get(endpoint_url: string = '', args: string = '',params: HttpParams = null) {
    let url = (this.api_url+endpoint_url+args);
    //console.log(url);
    return this._http.get(url,{params});
  }

}
