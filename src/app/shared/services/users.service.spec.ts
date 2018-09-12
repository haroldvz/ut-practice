import { TestBed, inject, async, getTestBed } from '@angular/core/testing';
import { UsersService } from './users.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { of } from 'rxjs';
import { usersDescriptor } from '../types/user.type';

//TEST HERE WITH HTTP?? OR MOCKS?

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

const UserServiceMock = {
  getUsers: () => {
    const todos = [{ login: 'haroldvz' }, { login: 'dev4ndy' }];
    return of(todos);
  },
  getUser: () => {
    const todo = { login: 'haroldvz' };
    return of(usersDescriptor.import(todo));
  }
};


describe('UserService', () => {

  let injector;
  let service: UsersService;
  let httpmock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: UsersService, useValue: UserServiceMock }]
    });
    injector = getTestBed();
    service = injector.get(UsersService);
    httpmock = injector.get(HttpTestingController);
  });

  /*describe('#getUser',()=>{
    it('should return an Observable',()=>{
      service.getUser('haroldvz').subscribe((data)=>{
        console.log(data);
        expect(data).toEqual(mock);
      });
    });
  });*/

  describe('#getUsers', () => {
    it('should return an Observable with the users data', () => {
      service.getUsers().subscribe((data) => {
        expect(data).toEqual([{ login: 'haroldvz' }, { login: 'dev4ndy' }]);
      });
    });
  });

})