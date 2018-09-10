import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpClientTestingModule,HttpTestingController } from '@angular/common/http/testing'; 
import { ApiService } from './api.service';
//si agrego el testing module, las pruebas pasan asi el mock y el parametro no esten bien,
//por que sera? :v
let mock = {
  
  "login": "haroldvz",
  "id": 38877229,
  "node_id": "MDQ6VXNlcjM4ODc3MjI5",
  "avatar_url": "https://avatars2.githubusercontent.com/u/38877229?v=4",
  "gravatar_id": "",
  "url": "https://api.github.com/users/haroldvz",
  "html_url": "https://github.com/haroldvz",
  "followers_url": "https://api.github.com/users/haroldvz/followers",
  "following_url": "https://api.github.com/users/haroldvz/following{/other_user}",
  "gists_url": "https://api.github.com/users/haroldvz/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/haroldvz/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/haroldvz/subscriptions",
  "organizations_url": "https://api.github.com/users/haroldvz/orgs",
  "repos_url": "https://api.github.com/users/haroldvz/repos",
  "events_url": "https://api.github.com/users/haroldvz/events{/privacy}",
  "received_events_url": "https://api.github.com/users/haroldvz/received_events",
  "type": "User",
  "site_admin": false,
  "name": "Harold Velez",
  "company": null,
  "blog": "",
  "location": null,
  "email": null,
  "hireable": null,
  "bio": null,
  "public_repos": 11,
  "public_gists": 0,
  "followers": 0,
  "following": 0,
  "created_at": "2018-05-01T06:59:17Z",
  "updated_at": "2018-09-06T15:54:57Z"
  
}

describe('ApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiService],
      // can use HttpClientTestingModule
      imports:[HttpClientModule,/*HttpClientTestingModule*/]//add this module to fix Error: StaticInjectorError(DynamicTestModule)[ApiService -> HttpClient]: StaticInjectorError(Platform: core)[ApiService -> HttpClient]: NullInjectorError: No provider for HttpClient!
    });
  });

  it('should be created', inject([ApiService], (service: ApiService) => {
    expect(service).toBeTruthy();
  }));

  /*it('should retrieve data from API via GET', async(inject([ApiService], (service: ApiService) => {
    service.getUser('haroldvz').subscribe((data)=>{
      expect(data).toEqual(mock);
    });
    })));*/

});
