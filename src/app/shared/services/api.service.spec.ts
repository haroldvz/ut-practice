import { TestBed, inject, async } from '@angular/core/testing';
import { ApiService } from './api.service';
// Http testing module and mocking controller
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { usersDescriptor } from '../types/user.type';
import { environment } from '../../../environments/environment';
import { Data } from '@angular/router';

//si agrego el testing module, las pruebas pasan asi el mock y el parametro no esten bien,
//por que sera? :v

describe('ApiService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let api_service:ApiService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiService],
      imports:[HttpClientTestingModule/*HttpClientTestingModule*/]//add this module to fix Error: StaticInjectorError(DynamicTestModule)[ApiService -> HttpClient]: StaticInjectorError(Platform: core)[ApiService -> HttpClient]: NullInjectorError: No provider for HttpClient!
    });
    // Inject the http service and test controller for each test
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    api_service = TestBed.get(ApiService);
  });

  it('should be created', inject([ApiService], (service: ApiService) => {
    expect(service).toBeTruthy();
  }));

  describe('When get() method is call',()=>{

    //----------------------
    it(`should return observable data from http.get() request with 'users' endpoint as param`,()=>{
      api_service.get('users').subscribe();//have to subscribe for the expectOne function detects the call
      httpTestingController.expectOne(environment.api_url+'users');
    });

    /*it(`should emit 'true' for 200 Ok`, async(inject([ApiService, HttpTestingController],
      (service: ApiService, backend: HttpTestingController) => {
        service.get('users').subscribe();
        backend.expectOne(environment.api_url+'users');
    })));*/
    //Both ways works 
    //----------------------

  });

  describe('When API is call', () => {

  //see https://medium.com/spektrakel-blog/angular-testing-snippets-httpclient-d1dc2f035eb8
  //see https://angular.io/guide/http#testing-http-requests
  //see https://stackblitz.com/angular/nkolkqmlkpr?file=src%2Ftesting%2Fhttp-client.spec.ts

    it('should call via GET the request URL', async(() => {
      const testData:usersDescriptor[]= [usersDescriptor.import({'login':'haroldvz','id':0,'url':'asasd','type':'User','avatar_url':'asdas'})];
      const testUrl = environment.api_url+'users';
      //const testData: Data = {name: 'Test Data'};
      // Make an HTTP GET request
      httpClient.get<usersDescriptor[]>(testUrl)
        .subscribe( (data) =>{
          //console.log(data);
          //console.log(testData);
          // When observable resolves, result should match test data
          expect(data).toEqual(testData)
        }
        );
    
      // The following `expectOne()` will match the request's URL.
      // If no requests or multiple requests matched that URL
      // `expectOne()` would throw.
      const req = httpTestingController.expectOne({
        url:'https://api.github.com/users',
        //method:'GET',
      });
    
      // Assert that the request is a GET.
      expect(req.request.method).toEqual('GET');
    
      // Respond with mock data, causing Observable to resolve.
      // Subscribe callback asserts that correct data was returned.
      req.flush(testData);
    
      // Finally, assert that there are no outstanding requests.
      httpTestingController.verify();
    }));


    it('should call via GET the request URL Version 2', async(() => {
      
      const testUrl = environment.api_url;
      // Make an HTTP GET request
      httpClient.get(testUrl)
        .subscribe();
    
      // The following `expectOne()` will match the request's URL.
      // If no requests or multiple requests matched that URL
      // `expectOne()` would throw.
      const req = httpTestingController.expectOne({
        url:'https://api.github.com/',
        //method:'GET',
      });
    
      // Assert that the request is a GET.
      expect(req.request.method).toEqual('GET');
    
      // Respond with mock data, causing Observable to resolve.
      // Subscribe callback asserts that correct data was returned.
      //req.flush(testData);
    
      // Finally, assert that there are no outstanding requests.
      httpTestingController.verify();
    }));

    it('can test for 404 error', () => {

      //const testUrl = environment.api_url;
      const testUrl = 'https://api.github.com/userss';
      //with both url works .. search why throw a 404 error

      const emsg = 'deliberate 404 error';
    
      httpClient.get(testUrl).subscribe(
        data => fail('should have failed with the 404 error'),
        (error: HttpErrorResponse) => {
          expect(error.status).toEqual(404, 'status');
          expect(error.error).toEqual(emsg, 'message');
        }
      );
    
      const req = httpTestingController.expectOne(testUrl);
    
      // Respond with mock error
      req.flush(emsg, { status: 404, statusText: 'Not Found' });

      httpTestingController.verify();
    });

  });


  it('can test for network error', () => {
    const emsg = 'simulated network error';

    const testUrl = 'https://api.github.com/userss';
  
    httpClient.get<Data[]>(testUrl).subscribe(
      data => fail('should have failed with the network error'),
      (error: HttpErrorResponse) => {
        //console.log(error.error.message);
        expect(error.error.message).toEqual(emsg, 'message');
      }
    );
  
    const req = httpTestingController.expectOne(testUrl);
  
    // Create mock ErrorEvent, raised when something goes wrong at the network level.
    // Connection timeout, DNS error, offline, etc
    const mockError = new ErrorEvent('Network error', {
      message: emsg,
    });
  
    // Respond with mock error
    req.error(mockError);

    httpTestingController.verify();
  });



});
