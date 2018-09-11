import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailUserComponent } from './detail-user.component';
import { UsersService } from '../../shared/services/users.service';
import { ApiService } from '../../shared/services/api.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

const UserServiceMock = {
  getUsers: () => {
    const todos = [{ login: 'haroldvz' }, { login: 'dev4ndy' }];
    return of(todos);
  },
  getUser: () => {
    const todo = { login: 'haroldvz' };
    return of(todo);
  }
};

/*
describe('DetailUserComponent', () => {
  let component: DetailUserComponent;
  let fixture: ComponentFixture<DetailUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
//ver Mocks
  describe('When getUser is called',()=>{

    beforeEach(()=>{
    
       
    });


  });
});
*/