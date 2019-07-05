import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  selectedGoal: any;
  errRegister: any;
  errServer: any;
  passwordMatch: boolean;
  goal = [
    { goal: 'Run', target: '100 km' },
    { goal: 'Workout', target: '900 minutes' },
    { goal: 'Lose', target: '4 Kgs' },
    { goal: 'Burn', target: '10000 Cal' }
  ];

  form: any;
  public page1 = true;
  public page2 = false;
  public page3 = false;

  constructor(private router: Router, private fb: FormBuilder, private registerSvc: RegisterService) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(dbs)\.com$/g)]],
      mobile: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]*$')]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmpassword: ['', Validators.required],
      weight: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      gender: ['', Validators.required],
      question: ['', Validators.required],
      answer: ['', Validators.required],
      goal: [''],
    });
  }

  public onRegister() {
    const request = { ...this.form.value };
    delete request.confirmpassword;
    this.registerSvc.getregistrationDetails(request).subscribe((data) => {
      console.log('saved successfully', data);
    }, (err) => {
      this.errRegister = err.error.error;
      console.log('Error saving the form', err);
    });
  }

  public clickNext() {
    if (this.form.value.password !== this.form.value.confirmpassword) {
      this.passwordMatch = true;
    } else {
      this.passwordMatch = false;
      this.page1 = false;
      this.page2 = true;
      console.log('*****', this.form.value);
    }
  }

  public goBack() {
    this.page2 = false;
    this.page1 = true;
  }
  public onSubmit() {
    this.page1 = false;
    this.page2 = false;
    this.page3 = true;
    this.onRegister();

  }

  public onDone() {
    this.router.navigate(['/login']);
  }

  public handleGoal(goals) {
    this.form.controls['goal'].setValue(goals.goal + ' ' + goals.target);
    this.selectedGoal = goals.goal + ' ' + goals.target;
    console.log(this.form.value);
  }

}
