import { async, ComponentFixture, TestBed, fakeAsync, getTestBed,tick } from '@angular/core/testing';
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
  let location:Location;
  let router:Router;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListUsersComponent,DetailUserComponent],
      imports: [CommonModule, RouterTestingModule, RouterTestingModule.withRoutes(testRoutes)],
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
    //compiled = fixture.debugElement.nativeElement;    
    service = TestBed.get(UsersService);
    
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should users variable be empty', () => {

    expect(component.users).toEqual([]);
  });

  it('test demands redirection', fakeAsync(() => {
    fixture.detectChanges();
    //we trigger a click on our link
    debugElement
        .query(By.css('#id_haroldvz'))
        .nativeElement.click();

    //We wait for all pending promises to be resolved.
    tick();

    expect(location.path()).toBe('/user/haroldvz');
    
}));

});
