import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AccountComponent } from './account/account.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

const routes = [
  { path: 'header', component: HeaderComponent },
  { path: 'account', component: AccountComponent },
  { path: '**', redirectTo: '/' }
];

import { ChessModule } from '../chess/chess.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChessModule,
    RouterModule.forRoot (routes),
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
