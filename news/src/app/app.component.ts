import { Component,OnInit } from '@angular/core';
import {news,channels} from './models/models';
import {AllService} from './services/all.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
  title = 'news';
 
  
  constructor(private services:AllService) { }

  ngOnInit():void{
    
    
  }
 
}
