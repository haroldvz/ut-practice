import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailUserComponent } from './detail-user.component';
import { UsersService } from '../../shared/services/users.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { usersDescriptor } from '../../shared/types/user.type';
import { GetAgePipe } from '../../shared/pipes/calculate-age.pipe';
import {CommonModule} from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';


const UserServiceMock = {
  getUser: () => {
    const todo = { login: 'haroldvz' };
    return of(usersDescriptor.import(todo));
  }
};

describe('DetailUserComponent', () => {
  let component: DetailUserComponent;
  let fixture: ComponentFixture<DetailUserComponent>;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ GetAgePipe, DetailUserComponent ],
      providers: [
        { provide: UsersService, useValue: UserServiceMock }],
      imports:[RouterTestingModule,CommonModule]
    })
    .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(DetailUserComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should user be undefined', () => {
    expect(component.user).toBeUndefined();
  });

  describe('When getUser is called',()=>{
    beforeEach(()=>{
      fixture.detectChanges();
    });
    it('should user be defined',()=>{
      expect(component.user).toBeDefined();
    });
    it('should user be defined',()=>{
      expect(component.user).toEqual(usersDescriptor.import({ login: 'haroldvz' }));
    });
  });

});
