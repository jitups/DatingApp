import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  currentUser$!: Observable<User>;

  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
    console.log('in ngOnInit');
    this.currentUser$ = this.accountService.currentUser$;
  }

  login(): void {
    console.log(this.model);
    this.accountService.login(this.model).subscribe(response => {
      console.log(response);
    },
      error => {
        console.log(error);
      });
  }

  logout(): void {
    this.accountService.logout();
  }
}
