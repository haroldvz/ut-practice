import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { UsersService } from '../../shared/services/users.service';
import { usersDescriptor } from '../../shared/types/user.type';
import { HttpParams } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SearchService } from '../../shared/services/search.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { DataSource } from '@angular/cdk/table';

export interface UserDataTable {
  id: number;
  login: string;
  url: string;
  type: string;
  avatar_url: string;
}


@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {

  users: usersDescriptor[] = [];

  searchCtrl: FormControl;
  searchValueChages: Observable<string>;
  _actual_page: number;


  //-----Material table --------
  displayedColumns: string[] = ['id', 'login', 'type', 'url'];
  dataSource: MatTableDataSource<usersDescriptor>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  //----------------------------


  constructor(private _user_service: UsersService, private _search_service: SearchService, private _router: Router) {
    //-----Material table --------
    //here cause have to be defined
    this.dataSource = new MatTableDataSource(this.users);
    //--------------------------
    
    this.searchCtrl = new FormControl();
    this.searchValueChages = this.searchCtrl.valueChanges.pipe(
      startWith(''),
      debounceTime(800),
      distinctUntilChanged());
  }

  /*sum(a: number, b: number): number {
    return a + b;
  }*/

  ngOnInit() {
    this._actual_page = 1;
    //-----Material table --------
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    //------------------
    this.listUsers();
    this.searchValueChages.subscribe(
      () => {
        
        this.searchUsers();
      }
    );
  }


  listUsers() {
    this._user_service.getUsers().subscribe((data) => {
      this.users = [];
      data.forEach(element => {
        this.users.push(usersDescriptor.import(element));
      });
      //-----Material table --------
      this.dataSource = new MatTableDataSource(this.users);
      //---------------------
      console.log("data source",this.dataSource);
    });
  }


  searchUsers() {

    if (this.searchCtrl.value != "" && this.searchCtrl.value != null) {
      let params = new HttpParams().set('q', this.searchCtrl.value).set('page', String(this._actual_page));
      this._search_service.searchSomething('users', params).subscribe((data) => {
       
        this.users = [];
        //console.log(data.items);
        this.users = data.items;
        //-----Material table --------
        this.dataSource = new MatTableDataSource(this.users);
        //---------------------------
        console.log("data source",this.dataSource);
      });
      //console.log(this.searchCtrl.value);
    } else {
      this.listUsers();
    }
    //const params = new HttpParams().set('q', users);
  }

  //-----Material table --------
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  //--------------------------

}
