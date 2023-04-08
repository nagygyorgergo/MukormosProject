import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateRecordComponent } from './create-record/create-record.component';
import { EditRecordComponent } from './edit-record/edit-record.component';
import { ListRecordComponent } from './list-record/list-record.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import { AuthGuard } from './services/auth.guard';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/list-reservations', pathMatch: 'full'},
  { path: 'create', component: CreateRecordComponent, canActivate: [AuthGuard]},
  { path: 'list-reservations', component: ListRecordComponent},
  { path: 'update-reservation/:id', component: EditRecordComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'login', component: LoginComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: '**', component: ListRecordComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
