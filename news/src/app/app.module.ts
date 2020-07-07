import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NselectorComponent } from './nselector/nselector.component';
import { NsectionComponent } from './nsection/nsection.component';
import { Section1Component } from './nsection/section1/section1.component';
import { Section2Component } from './nsection/section2/section2.component';
import { Section3Component } from './nsection/section3/section3.component';



@NgModule({
  declarations: [
    AppComponent,
    NsectionComponent,
    Section1Component,
    NselectorComponent,
    Section2Component,
    Section3Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
