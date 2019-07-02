import { NgModule, Component } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { Route, RouterModule } from '@angular/router';




const ROUTER: Route[] = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profile', component: UserProfileComponent },
    { path: '**', redirectTo: 'login', pathMatch: 'full' }

];

@NgModule({
    imports: [RouterModule.forRoot(ROUTER, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
