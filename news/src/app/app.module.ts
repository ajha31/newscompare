import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import {FormsModule} from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SinglenewsComponent } from './components/singlenews/singlenews.component';
import { NewscompComponent } from './components/newscomp/newscomp.component';
import { AllnewsComponent } from './components/allnews/allnews.component';
import { SelectorComponent } from './components/selector/selector.component';



@NgModule({
  declarations: [
    AppComponent,
    SinglenewsComponent,
    NewscompComponent,
    AllnewsComponent,
    SelectorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
