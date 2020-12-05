import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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

  constructor(public accountService: AccountService,
    private route: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
  }

  login(): void {
    console.log(this.model);
    this.accountService.login(this.model).subscribe(response => {
      this.route.navigateByUrl('/matches');
    },
      error => {
        console.log(error);
        this.toastr.error(error.error);
      });
  }

  logout(): void {
    this.accountService.logout();
    this.route.navigateByUrl('/');
  }
}
