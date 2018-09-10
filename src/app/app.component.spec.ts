import { TestBed, async, fakeAsync, getTestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, Router } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ListUsersComponent } from './users/list-users/list-users.component';
import { UsersService } from './shared/services/users.service';
import { HttpClientModule } from '@angular/common/http';//	para corregirError: Uncaught (in promise): Error: StaticInjectorError(DynamicTestModule)[HttpClient]: 


const testRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'users',
    component: ListUsersComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        RouterTestingModule.withRoutes(testRoutes),
        HttpClientModule
      ],
      providers:[UsersService,],
      declarations: [
        AppComponent, HomeComponent, ListUsersComponent
      ],
    }).compileComponents();
  }));


  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should be able to navigate to `/`',
    fakeAsync(() => {
      const injector = getTestBed();
      const router = injector.get(Router);
      const fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
      // initial navigation
      
      router.navigate(['/'])
        .then(() => {
          expect(router.url).toEqual('/home');
        });
    }));

    it('should be able to navigate to `/home`',
    fakeAsync(() => {
      const injector = getTestBed();
      const router = injector.get(Router);
      const fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
      // initial navigation
      
      router.navigate(['/'])
        .then(() => {
          expect(router.url).toEqual('/home');
        });
    }));

   it('should be able to navigate to `/users`',
    fakeAsync(() => {
      const injector = getTestBed();
      const router = injector.get(Router);
      const fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
      // initial navigation
      router.navigate(['users'])
        .then(() => {
          expect(router.url).toEqual('/users');
        });
    }));






  /*it(`should have as title 'practice-ut'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('practice-ut');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to practice-ut!');
  }));*/
});
