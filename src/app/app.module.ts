import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListUsersComponent } from './users/list-users/list-users.component';
import { DetailUserComponent } from './users/detail-user/detail-user.component';
import { UsersService } from './shared/services/users.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
//import { HttpClientModule } from '@angular/common/http'; 
@NgModule({
  declarations: [
    AppComponent,
    ListUsersComponent,
    DetailUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    //HttpClientModule
  ],
  providers: [UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
