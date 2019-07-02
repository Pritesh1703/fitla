import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  selectedGoal: any;
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
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      password: ['', Validators.required, Validators.minLength(8)],
      weight: ['', Validators.required],
      gender: ['', Validators.required],
      goal: ['', Validators.required]
    });
  }

  public onRegister() {
    this.registerSvc.getregistrationDetails(this.form.value).subscribe((data) => {
      console.log('saved successfully', data);
    }, (err) => {
      console.log('Error saving the form', err);
    });
  }

  public clickNext() {
    this.page1 = false;
    this.page2 = true;
    console.log('*****', this.form.value);

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
