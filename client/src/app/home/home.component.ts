import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  registerMode: boolean = false;
  users: any;

  constructor(private http: HttpClient,
    private accountService: AccountService) { }

  ngOnInit(): void {
    this.getUsers();
    this.setCurrentUser();
  }

  setCurrentUser(): void {
    const user: User = JSON.parse(localStorage.getItem('user') || '{}');
    this.accountService.setCurrentUser(user);
  }

  getUsers(): void {
    this.http.get('https://localhost:5001/api/users').subscribe(response => {
      this.users = response;
    },
      error => {
        console.log(error);
      });
  }

  public registerToggle(): void {
    console.log('In registerToggle');
    this.registerMode = !this.registerMode;
  }

  public cancelRegistrationMode($event: boolean) {
    this.registerMode = $event;
  }
}
