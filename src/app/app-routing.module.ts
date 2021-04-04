import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CreateAccountComponent} from './account/account-create/account-create.component';
import { UpdateAccountComponent } from './account/account-update/account-update.component';

const routes: Routes = [
  { path: 'account', component: CreateAccountComponent },
  { path: 'myaccount', component: UpdateAccountComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
