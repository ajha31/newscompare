import { Component, OnInit,Inject,Input } from '@angular/core';
import {news} from '../../models/models';

import {ModalboxComponent} from '../utilities/modalbox/modalbox.component'
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-newscomp',
  templateUrl: './newscomp.component.html',
  styleUrls: ['./newscomp.component.scss']
})
export class NewscompComponent implements OnInit {
  @Input() article:news[];
  
  head:any[];
  link:any;
  constructor(public dialog:MatDialog) { }

  ngOnInit(): void {
  
  }
 
  openDialog(n): void {
    this.link=n
    const dialogRef = this.dialog.open(ModalboxComponent,{
      width:'80%',
      height:'80%',
    
      data: {link: this.link}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }
}
