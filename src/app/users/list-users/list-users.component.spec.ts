import { async, ComponentFixture, TestBed, fakeAsync, getTestBed } from '@angular/core/testing';
import { ListUsersComponent } from './list-users.component';
import { UsersService } from '../../shared/services/users.service';
import { of } from 'rxjs';
import { HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Routes, Router } from '@angular/router';
import { DetailUserComponent } from '../detail-user/detail-user.component';
import { By } from '@angular/platform-browser';


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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListUsersComponent, DetailUserComponent],
      imports: [RouterTestingModule, RouterTestingModule.withRoutes(testRoutes),],
      providers: [
        { provide: UsersService, useValue: UserServiceMock }],
    }).compileComponents();;
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(ListUsersComponent);
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

  describe('#ngOninit', () => {
    describe('When ngOninit is call', () => {
      it('should users be defined', () => {
        fixture.detectChanges();
        expect(component.users).toBeDefined();
      });
      it('should users have to 3 elements', () => {
        fixture.detectChanges();
        expect(component.users.length).toEqual(3);//becuse in the mock class are 3 users in getUsers()
      });
    });
  });


  describe('#UI', () => {
    
    describe('When some list user is clicked', () => {
      let rou:Router;
      let compiled;
      beforeEach(() => {

        rou = TestBed.get(Router);
        fixture = TestBed.createComponent(ListUsersComponent);
        component = fixture.componentInstance;
        compiled = fixture.debugElement.nativeElement;
        service = TestBed.get(UsersService);
        
     
      });

      it('should be able to navigate to user-detail: `/user:login` ',
        fakeAsync(() => {
          fixture.detectChanges();
          const injector = getTestBed();
          const router = injector.get(Router);
          //let username = compiled.querySelector('#id_haroldvz');
          let li = fixture.debugElement.query(By.css('#id_haroldvz'));
          console.log(li);
          /*fixture.detectChanges();
          let username = compiled.querySelector('#id_haroldvz').textContent;
          router.navigate(['/user/' + username])
            .then(() => {
              expect(router.url).toEqual('/user/haroldvz');
            });*/
            const spy = spyOn(rou,'navigate');
            fixture.detectChanges();
            li.triggerEventHandler('click',null);
            console.log("navigateeeeeee")
            console.log(spy.calls.first());
        }));


    });
  });


});
