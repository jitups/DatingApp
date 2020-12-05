import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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

  constructor(private accountService: AccountService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    console.log(this.usersFromHomeComponent);
  }

  register(): void {
    this.accountService.register(this.model).subscribe(response => {
      console.log(response);
      this.cancel();
    },
      error => {
        this.toastr.error(error.error);
      });
  }

  cancel(): void {
    this.cancelRegistration.emit(false);
  }
}
