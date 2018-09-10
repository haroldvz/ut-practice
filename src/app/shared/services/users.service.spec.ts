import { TestBed, inject, async, getTestBed } from '@angular/core/testing';
import { UsersService } from './users.service';
import { HttpClientModule } from '@angular/common/http'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { ApiService } from './api.service';


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
  "public_repos": 12,
  "public_gists": 0,
  "followers": 0,
  "following": 0,
  "created_at": "2018-05-01T06:59:17Z",
  "updated_at": "2018-09-06T15:54:57Z"
}


describe('UsersService', () => {
  let user_service: UsersService;
  let httpmock: HttpTestingController = null;
  let api_service_spy: jasmine.SpyObj<ApiService>;
  let apise: ApiService;

  //if i define here not works with the userservice, the function get called 0 times .. fix !!
  const spy = jasmine.createSpyObj('ApiService', ['get']);

  beforeEach(() => {


    TestBed.configureTestingModule({
      providers: [UsersService],
      imports: [HttpClientModule]
    });

    //spyOn(apise,'get');

    user_service = TestBed.get(UsersService);
    api_service_spy = TestBed.get(ApiService);
    //httpmock = TestBed.get(HttpTestingController);//only works with HttpClientTestingModule
  });

  it('should be created', inject([UsersService], (service: UsersService) => {
    expect(service).toBeTruthy();
  }));

  describe('When consult to haroldvz user', () => {
    it('should retrieve haroldvz user data from API via GET', async(inject([ApiService], (api_ser: ApiService) => {

      //spyOn(api_ser,'get').and.returnValue(Observable.of());
      let s = new UsersService(api_ser);//also works with this
      //spyOn(api_ser, 'get'); // 
      user_service.getUser('haroldvz').subscribe((data) => {
        console.log("Get user haroldvz")
        console.log(data);
        expect(data).toEqual(mock);//compare all json fields with all data fields
      });

      expect(spy.get).toBeDefined();
      expect(spy.get).toHaveBeenCalledTimes(0);

    })));
  });
});


/*
describe('UserService', ()=>{

  let injector;
  let service:UsersService;
  let httpmock:HttpTestingController;

  beforeEach(()=>{
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[UsersService]
    });
    injector = getTestBed();
    service = injector.get(UsersService);
    httpmock = injector.get(HttpTestingController);


  });


  describe('#getUser',()=>{

    it('should return an Observable',()=>{
      service.getUser('haroldvz').subscribe((data)=>{
        console.log(data);
        expect(data).toEqual(mock);
      });
    });

  });




})*/