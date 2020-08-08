import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import {channels,news} from '../../../models/models';
import {AllService} from '../../../services/all.service'

@Component({
  selector: 'app-sselector',
  templateUrl: './sselector.component.html',
  styleUrls: ['./sselector.component.scss']
})
export class SselectorComponent implements OnInit {
  @Input() channel:channels[];
  @Input() articles:news[];
  @Output() getNews:EventEmitter<any> = new EventEmitter();
  @Input() heading:string[]=[];
  display:string;
  logo:any;

  constructor(private services:AllService ) { }

  ngOnInit(): void {
    this.display=this.channel[0].name;
    this.logo=this.channel[0].logo;

    this.getnews(this.display)
  }

  getnews(ch){
    this.getNews.emit(ch);
  }
  getlogo(l){
    for (let i = 0; i < this.channel.length; i++) {
        if(this.channel[i].name==l){
          this.logo=this.channel[i].logo
        }
    }
  }
}
