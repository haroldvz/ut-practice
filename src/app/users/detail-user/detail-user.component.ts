import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../shared/services/users.service';
import { usersDescriptor } from '../../shared/types/user.type';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.scss']
})
export class DetailUserComponent implements OnInit {
  routerSubscribe;
  user: usersDescriptor;
  constructor(private route: ActivatedRoute, private _user_service: UsersService) { }
  ngOnInit() {
    this.routerSubscribe = this.route.params.subscribe(params => {
      let username: string = params['username'];
      this._user_service.getUser(username).subscribe((data) => {
        this.user = data;
      })
    });
  }
}
