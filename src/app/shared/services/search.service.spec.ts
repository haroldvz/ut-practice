import { TestBed, inject, async } from '@angular/core/testing';

import { SearchService } from './search.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { environment } from '../../../environments/environment';
import { usersDescriptor } from '../types/user.type';
import { searchDescriptor } from '../types/search.type';
import { Observable, of } from 'rxjs';

describe('SearchService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let api_service: ApiService;
  let search_service: SearchService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchService, ApiService],
      imports: [HttpClientTestingModule]
    });
    //testBed definitions
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    api_service = TestBed.get(ApiService);
    search_service = TestBed.get(SearchService);

  });

  it('should be created', inject([SearchService], (service: SearchService) => {
    expect(service).toBeTruthy();
  }));


  describe('When searchSomething() method is call', () => {
    it('should call the API via GET', async(() => {
      spyOn(api_service, 'get').and.callThrough();
      const params = new HttpParams().set('q', 'harold');
      
      search_service.searchSomething('users', params).subscribe();
      expect(api_service.get).toHaveBeenCalledTimes(1);
     
      const req  = httpTestingController.expectOne(environment.api_url + 'search/users?q=harold');
      // Assert that the request is a GET.
      expect(req.request.method).toEqual('GET');
    
      // Respond with mock data, causing Observable to resolve.
      // Subscribe callback asserts that correct data was returned.
      //req.flush(testData);
      
      // Finally, assert that there are no outstanding requests.
      httpTestingController.verify();
     
    }));

    it('should return search data <searchDescriptor>', async(() => {
      const expect_response = {
        'items':
         [
           usersDescriptor.import({ login: 'haroldvz' }),
           usersDescriptor.import({ login: '22222' }),
           usersDescriptor.import({ login: '78787787' })
         ],
       'total_count': 3,
       'incomplete_results': false
       
     };
     spyOn(api_service, 'get').and.returnValue(of(expect_response));
     const params = new HttpParams().set('q', 'harold');
     search_service.searchSomething('users', params).subscribe((data)=>{
       console.log("Data TEST search service");
       console.log(data);
      expect(data).toEqual(searchDescriptor.import(expect_response));

     });
     expect(api_service.get).toHaveBeenCalledTimes(1);
   }));
  });










});
