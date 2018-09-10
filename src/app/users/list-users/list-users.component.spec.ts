import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUsersComponent } from './list-users.component';
import { UsersService } from '../../shared/services/users.service';
import { of } from 'rxjs';
import { HttpTestingController } from '@angular/common/http/testing';

const UserServiceMock = {
  getUsers: () => {
    const todos = [{ login: 'haroldvz' }, { login: 'dev4ndy' }];
    return of(todos);
  },
  getUser: () => {
    const todo = [{ login: 'haroldvz' }];
    return of(todo);
  }
};


describe('ListUsersComponent', () => {
  let service: UsersService;
  let httpmock: HttpTestingController;
  let component: ListUsersComponent;
  let fixture: ComponentFixture<ListUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListUsersComponent],
      providers: [
        { provide: UsersService, useValue: UserServiceMock }],
    }).compileComponents();;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUsersComponent);
    component = fixture.componentInstance;
    service = TestBed.get(UsersService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should users variable be undefined', () => {
    expect(component.users).toBeUndefined();
  });

  describe('#ngOninit', () => {
    it('should users be defined', () => {
      fixture.detectChanges();
      expect(component.users).toBeDefined();
    });
  });




});
