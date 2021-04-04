import { EventEmitter, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CreateAccountComponent } from './account/account-create/account-create.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

const routes = [
  { path: 'header', component: HeaderComponent },
  { path: 'account', component: CreateAccountComponent },
  { path: '**', redirectTo: '/' }
];

import { ChessModule } from '../chess/chess.module';
import { UpdateAccountComponent } from './account/account-update/account-update.component';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CreateAccountComponent,
    UpdateAccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChessModule,
    RouterModule.forRoot (routes),
    FormsModule,
    HttpClientModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
