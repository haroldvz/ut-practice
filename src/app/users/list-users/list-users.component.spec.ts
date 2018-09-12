import { async, ComponentFixture, TestBed, fakeAsync, getTestBed, tick, discardPeriodicTasks } from '@angular/core/testing';
import { ListUsersComponent } from './list-users.component';
import { UsersService } from '../../shared/services/users.service';
import { of } from 'rxjs';
import { HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Routes, Router } from '@angular/router';
import { DetailUserComponent } from '../detail-user/detail-user.component';
import { By } from '@angular/platform-browser';
import { CommonModule, Location } from '@angular/common';
import { DebugElement } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


const UserServiceMock = {
  getUsers: () => {
    const todos = [{ login: 'haroldvz' }, { login: 'dev4ndy' }, { login: 'daniel' }];
    return of(todos);
  },
 
};

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
        { provide: UsersService, useValue: UserServiceMock }],
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
      it('should users be defined',() => {
        fixture.detectChanges();
        spy = spyOn(component,'listUsers').and.returnValue(true);
        console.log(spy);
        expect(component.users).toBeDefined();
        expect(spy).toHaveBeenCalled();
      });
      it('should users have to 3 elements', () => {
        fixture.detectChanges();
        

        expect(component.users.length).toEqual(3);//becuse in the mock class are 3 users in getUsers()
       
      });
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

});
