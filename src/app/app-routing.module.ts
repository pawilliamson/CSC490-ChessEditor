import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainMenu} from './menu/main-menu.component';
import {ExtraExtra} from './extra/extras.component';

const routes: Routes = [
{ path: 'menu/main-menu.component.ts', component: MainMenu },
{ path: 'extra/extras.component.ts', component: ExtraExtra}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
