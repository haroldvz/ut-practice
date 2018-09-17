import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from '../../shared/services/users.service';
import { usersDescriptor } from '../../shared/types/user.type';
import { HttpParams } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SearchService } from '../../shared/services/search.service';

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

  @Input() query: string;

  constructor(private _user_service: UsersService, private _search_service: SearchService, private _router: Router) {
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
    });
  }


  searchUsers() {

    if (this.searchCtrl.value != "" && this.searchCtrl.value != null) {
      let params = new HttpParams().set('q', this.searchCtrl.value).set('page', String(this._actual_page));
      this._search_service.searchSomething('users', params).subscribe((data) => {
       
        this.users = [];
        //console.log(data.items);
        this.users = data.items;
      });
      //console.log(this.searchCtrl.value);
    } else {
      this.listUsers();
    }
    //const params = new HttpParams().set('q', users);
  }

}
