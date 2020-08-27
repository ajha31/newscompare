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
    
    //enableTracing:true
   // useHash: true
  })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
