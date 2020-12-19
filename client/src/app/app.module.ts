import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { MatchesComponent } from './matches/matches.component';
import { ListComponent } from './list/list.component';
import { MessagesComponent } from './messages/messages.component'
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from './modules/shared.module';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { ServerErrorComponent } from './errors/server-error.component';
import { NotFoundComponent } from './errors/not-found.component';
import { MemberCardComponent } from './matches/member-card/member-card.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { MemmberDetailsComponent } from './matches/memmber-details/memmber-details.component';
import { MemberEditComponent } from './matches/member-edit/member-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MatchesComponent,
    ListComponent,
    MessagesComponent,
    ServerErrorComponent,
    NotFoundComponent,
    MemberCardComponent,
    MemmberDetailsComponent,
    MemberEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    SharedModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
