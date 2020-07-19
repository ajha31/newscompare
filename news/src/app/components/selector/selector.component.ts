import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import {channels,news} from '../../models/models';
import {AllService} from '../../services/all.service'

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss']
})
export class SelectorComponent implements OnInit {
  @Input() channel:channels[];
  @Input()  articles:news[];
  @Output()  getNews:EventEmitter<any> = new EventEmitter();

  display:string;
 

  constructor(private services:AllService ) { }

  ngOnInit(): void {
    this.display=this.channel[0].name;
    this.getnews(this.display)
  }

  getnews(ch){
    this.getNews.emit(ch);
  }

}
