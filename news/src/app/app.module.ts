import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SinglenewsComponent } from './components/singlenews/singlenews.component';
import { NewscompComponent } from './components/newscomp/newscomp.component';
import { AllnewsComponent } from './components/allnews/allnews.component';
import { SelectorComponent } from './components/selector/selector.component';
import { SselectorComponent } from './components/allnews/sselector/sselector.component';
import { SnewscompComponent } from './components/allnews/sselector/snewscomp/snewscomp.component';
import { HeaderComponent } from './components/utilities/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalboxComponent } from './components/utilities/modalbox/modalbox.component'
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule} from'@angular/material/dialog';
import { MatButtonModule} from '@angular/material/button'
import { MatIconModule} from '@angular/material/icon'
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import { MatToolbarModule} from '@angular/material/toolbar'

@NgModule({
  declarations: [
    AppComponent,
    SinglenewsComponent,
    NewscompComponent,
    AllnewsComponent,
    SelectorComponent,
    SselectorComponent,
    SnewscompComponent,
    HeaderComponent,
    ModalboxComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
