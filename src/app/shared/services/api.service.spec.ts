import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpClientTestingModule,HttpTestingController } from '@angular/common/http/testing'; 
import { ApiService } from './api.service';
//si agrego el testing module, las pruebas pasan asi el mock y el parametro no esten bien,
//por que sera? :v

describe('ApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiService],
      // can use HttpClientTestingModule
      imports:[HttpClientModule/*HttpClientTestingModule*/]//add this module to fix Error: StaticInjectorError(DynamicTestModule)[ApiService -> HttpClient]: StaticInjectorError(Platform: core)[ApiService -> HttpClient]: NullInjectorError: No provider for HttpClient!
    });
  });

  it('should be created', inject([ApiService], (service: ApiService) => {
    expect(service).toBeTruthy();
  }));

});
