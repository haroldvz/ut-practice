import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../shared/services/users.service';
import { usersDescriptor } from '../../shared/types/user.type';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {

  users:usersDescriptor[] = [];

  constructor(private _user_service:UsersService) { }

  sum(a: number, b: number): number {
    return a + b;
  }

  ngOnInit() {
    this._user_service.getUsers().subscribe((data)=>{
      console.log(this.users);
      data.forEach(element => {
          this.users.push(usersDescriptor.import(element));
      });
    })
  }

}
