import { async, ComponentFixture, TestBed, fakeAsync, getTestBed, tick, discardPeriodicTasks } from '@angular/core/testing';
import { ListUsersComponent } from './list-users.component';
import { UsersService } from '../../shared/services/users.service';
import { of, Observable } from 'rxjs';
import { HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Routes, Router } from '@angular/router';
import { DetailUserComponent } from '../detail-user/detail-user.component';
import { By } from '@angular/platform-browser';
import { CommonModule, Location } from '@angular/common';
import { DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule, HttpParams } from '@angular/common/http';
import { SearchService } from '../../shared/services/search.service';
import { usersDescriptor } from '../../shared/types/user.type';


const UserServiceMock = {
  getUsers: () => {
    const todos = [{ login: 'haroldvz' }, { login: 'dev4ndy' }, { login: 'daniel' }];
    return of(todos);
  },



};


const SearchServiceMock = {

  searchSomething: () => {
    const all = [usersDescriptor.import({ login: 'haroldvz' }), usersDescriptor.import({ login: 'haroldvz' }), usersDescriptor.import({ login: 'haroldvz' })];
    return of(all);
  }

}

const testRoutes: Routes = [
  {
    path: 'user/:login',
    component: DetailUserComponent
  },
];


describe('ListUsersComponent', () => {
  let service: UsersService;
  let httpmock: HttpTestingController;
  let component: ListUsersComponent;
  let fixture: ComponentFixture<ListUsersComponent>;
  let location: Location;
  let router: Router;
  let debugElement: DebugElement;

  let spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ListUsersComponent, DetailUserComponent],
      imports: [CommonModule, RouterTestingModule, RouterTestingModule.withRoutes(testRoutes),
        ReactiveFormsModule, FormsModule, HttpClientModule],
      providers: [
        { provide: UsersService, useValue: UserServiceMock }, { provide: SearchService, useValue: SearchServiceMock }],
    }).compileComponents();;
  }));
  beforeEach(() => {
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(ListUsersComponent);
    debugElement = fixture.debugElement;
    component = fixture.componentInstance;
    service = TestBed.get(UsersService);

  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should users variable be empty', () => {
    expect(component.users).toEqual([]);
  });

  describe('#ngOninit', () => {
    describe('When ngOninit is call', () => {
      it('should users be defined', () => {

        spyOn(component, 'listUsers');
        fixture.detectChanges();
        //component.listUsers();
        console.log(component.users);
        expect(component.users).toBeDefined();
        expect(component.listUsers).toHaveBeenCalled();
      });
      it('should users have to 3 elements', () => {
        fixture.detectChanges();
        expect(component.users.length).toEqual(3);//becuse in the mock class are 3 users in getUsers()
      });
      it('should actual page equal to 1', async(() => {//cause the subscribe, if I not use async the _actual page property will be undefined

        spyOn(component, 'searchUsers');
        fixture.detectChanges();
        component.searchValueChages.subscribe(() => {
          expect(component._actual_page).toEqual(1);
          expect(component.searchUsers).toHaveBeenCalled();
          expect(component.searchUsers).toHaveBeenCalledTimes(1);

        });

      }));
    });
  });

  describe('When click in haroldvz user', () => {
    it('should redirect to /user/haroldvz (Detail Component)', fakeAsync(() => {
      fixture.detectChanges();
      //we trigger a click on our link
      debugElement
        .query(By.css('#id_haroldvz'))
        .nativeElement.click();

      //We wait for all pending promises to be resolved.
      tick();

      expect(location.path()).toBe('/user/haroldvz');
      discardPeriodicTasks();
    }));
  });


  describe('SearchUser', () => {
    let search_serv: SearchService;
    beforeEach(() => {
      search_serv = TestBed.get(SearchService);


    });
    describe('When SearchUser is called', () => {
      it('should fill the users array with the API data', async(() => {
        spyOn(search_serv, 'searchSomething').and.callThrough();
        //spyOn(component.searchValueChages,'subscribe').and.callThrough();
        fixture.detectChanges();
        component.searchCtrl.setValue('harold');//test the if when searchCtrl exits
        console.log(component.searchCtrl.value);
        component.searchUsers();
        let page = undefined;
        //page = component._actual_page;
        //console.log(page);
        component.searchValueChages.subscribe(() => {
          page = component._actual_page;
          console.log(page);
          //console.log(component.users);
          console.log(page);
          let params = new HttpParams().set('q', 'harold').set('page', String(1));

          expect(search_serv.searchSomething).toHaveBeenCalled();
          expect(search_serv.searchSomething).toHaveBeenCalledWith('users', params);
          expect(search_serv.searchSomething).toHaveBeenCalledTimes(2);
        });








      }));

    });
  });

});
