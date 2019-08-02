import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LoginService } from './login.service';
import { UserService } from '../users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  form: any;
  adminform: any;
  errstatus: any;
  images = [
    '../../assets/img/image1.jpg',
    '../../assets/img/image3.jpg',
    '../../assets/img/image5.jpg',
  ];
  currentIndex = 0;
  timer;
  adminLogin: boolean;

  constructor(private router: Router, private fb: FormBuilder, private loginSvc: LoginService, private userSvc: UserService) {
    this.loginSvc.isLoggedIn().subscribe(login => {
      if (login) {
        this.router.navigate(['/profile']);
      } else {
        console.log('Invalid credentials');
      }
    });
  }

  ngOnInit() {
    this.changeImage();
    this.timer = setInterval(() => {
      this.changeImage();
    }, 3000);

    this.form = this.fb.group({
      mobile: [],
      password: []
    });

    this.adminform = this.fb.group({
      passcode: []
    });
  }


  changeImage() {
    if (this.currentIndex < this.images.length) {
      this.currentIndex++;
    } else {
      this.currentIndex = 1;
    }

    document.getElementById('carousel').setAttribute('src', this.images[this.currentIndex - 1]);
  }

  onRegister() {
    this.router.navigate(['/register']);
  }

  onLogin() {
    this.loginSvc.login(this.form.value).subscribe((response) => {
      if (response.status && response.status === 'failed') {
        this.errstatus = response.status;
      } else {
        this.loginSvc.saveToken(response.token);
        this.router.navigate(['/profile']);
        console.log(response);
      }

    },
      (err) => {

        console.log(err);


      });
  }

  public admin() {
    this.adminLogin = true;
  }

  public onAdminLogin() {
    this.userSvc.getAlluser(this.adminform.value.passcode).subscribe((response) => {
      console.log(response);
      this.router.navigate(['/admin']);

    }, (err) => {
      console.log(err);
    });

  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

}
