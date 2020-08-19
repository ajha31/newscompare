import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AllnewsComponent} from './components/allnews/allnews.component'
import {SinglenewsComponent} from './components/singlenews/singlenews.component'

const routes: Routes = [
  { path: '', component:AllnewsComponent },
  { path: ':topic', component:SinglenewsComponent }

  
];

@NgModule({
  imports: [  RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
  })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
