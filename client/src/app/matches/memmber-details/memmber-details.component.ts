import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/models/member';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-memmber-details',
  templateUrl: './memmber-details.component.html',
  styleUrls: ['./memmber-details.component.css']
})
export class MemmberDetailsComponent implements OnInit {
  member!: Member;
  constructor(private memberService: MembersService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    this.memberService
      .getMember(this.route.snapshot.paramMap.get('username')!)
      .subscribe(member => this.member = member);
  }
}
