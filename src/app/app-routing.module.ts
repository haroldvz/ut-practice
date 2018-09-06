import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailUserComponent } from './users/detail-user/detail-user.component';
import { ListUsersComponent } from './users/list-users/list-users.component';

const routes: Routes = [
  {path: '', redirectTo: 'users', pathMatch: 'full'},
  {path:'user/:username', component:DetailUserComponent},
  {path:'users', component:ListUsersComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
