import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import{news} from '../../../../models/models'
@Component({
  selector: 'app-snewscomp',
  templateUrl: './snewscomp.component.html',
  styleUrls: ['./snewscomp.component.scss']
})
export class SnewscompComponent implements OnInit {

  @Input() article:news[];
  
  head:any[];
  constructor() { }

  ngOnInit(): void {
    
  }
 

}
