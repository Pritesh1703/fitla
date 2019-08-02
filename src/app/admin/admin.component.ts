import { Component, OnInit } from '@angular/core';
import { UserService } from '../users.service';
import { Router } from '@angular/router';
import { ExcelService } from '../excel.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  allUsers: any;
  totalUsers: number;
  constructor(private userSvc: UserService, private router: Router, private excelService: ExcelService) { }

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

  public exportAsXLSX(): void {
    const exportedUsers = this.allUsers.map(user => {
      return {
        name: user.name,
        mobile: user.mobile,
        gender: user.gender,
        weight: user.weight,
        goal: user.goal
      };
    });
    this.excelService.exportAsExcelFile(exportedUsers, 'users');
  }

}
