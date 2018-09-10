import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../shared/services/users.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {

  constructor(private _user_service:UsersService) { }

  sum(a: number, b: number): number {
    return a + b;
  }

  users;

  ngOnInit() {
    this._user_service.getUsers().subscribe((data)=>{
      console.log(data);
      this.users = data;
    })
  }

}
