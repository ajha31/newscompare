import { Component, OnInit, Input } from '@angular/core';
import{news} from '../../models/models'

@Component({
  selector: 'app-newscomp',
  templateUrl: './newscomp.component.html',
  styleUrls: ['./newscomp.component.scss']
})
export class NewscompComponent implements OnInit {
  @Input() article:news[];

  constructor() { }

  ngOnInit(): void {
    
  }

}
