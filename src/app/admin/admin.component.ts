import { Component, OnInit } from '@angular/core';
import { UserService } from '../users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  allUsers: any;
  totalUsers: number;
  constructor(private userSvc: UserService, private router: Router) { }

  ngOnInit() {
    this.allUsers = this.userSvc.allUsers.subscribe((data) => {
      this.allUsers = data;
      this.totalUsers = this.allUsers.length;
    }, (err) => {
      console.log(err);
    });

  }

  public onLogout() {
    this.allUsers = null;
    this.router.navigate(['/login']);
  }

}
