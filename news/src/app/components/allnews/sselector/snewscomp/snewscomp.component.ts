import { Component, OnInit, Input } from '@angular/core';
import{news} from '../../../../models/models'
import {ModalboxComponent} from '../../../utilities/modalbox/modalbox.component'
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-snewscomp',
  templateUrl: './snewscomp.component.html',
  styleUrls: ['./snewscomp.component.scss']
})
export class SnewscompComponent implements OnInit {

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
