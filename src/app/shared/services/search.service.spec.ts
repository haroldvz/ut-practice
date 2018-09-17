import { TestBed, inject, async } from '@angular/core/testing';

import { SearchService } from './search.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { environment } from '../../../environments/environment';

describe('SearchService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let api_service:ApiService;
  let search_service:SearchService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchService,ApiService],
      imports:[HttpClientTestingModule]
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


  describe('When searchSomething() method is call',() => {
     it('should return an Observable of <searchDescriptor>',async(()=>{
        spyOn(api_service,'get').and.callThrough();
        const params = new HttpParams().set('q', 'harold');
        search_service.searchSomething('users',params).subscribe(
          (data) =>{
            console.log("SEARCHHHHHHHHH");
            expect(data).toEqual({'login':'harold'});
          }
        );
        expect(api_service.get).toHaveBeenCalledTimes(1);
        httpTestingController.expectOne(environment.api_url+'search/users?q=harold');
        httpTestingController.verify();
     }));
  });










});
