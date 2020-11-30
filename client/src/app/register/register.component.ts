import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() usersFromHomeComponent: any;
  @Output() cancelRegistration = new EventEmitter();
  model: any = {};

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    console.log(this.usersFromHomeComponent);
  }

  register(): void {
    this.accountService.register(this.model).subscribe(response => {
      console.log(response);
      this.cancel();
    });
  }

  cancel(): void {
    this.cancelRegistration.emit(false);
  }
}
