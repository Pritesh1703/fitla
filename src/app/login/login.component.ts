import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  form: any;
  errstatus: any;
  images = [
    '../../assets/img/image1.jpg',
    '../../assets/img/image3.jpg',
    '../../assets/img/image5.jpg',
  ];
  currentIndex = 0;
  timer;

  constructor(private router: Router, private fb: FormBuilder, private loginSvc: LoginService) {
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
      email: [],
      password: []
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

      this.loginSvc.saveToken(response.token);
      this.router.navigate(['/profile']);
      console.log(response);
    },
      (err) => {
        this.errstatus = err.status;
        console.log(err);

      });
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

}
