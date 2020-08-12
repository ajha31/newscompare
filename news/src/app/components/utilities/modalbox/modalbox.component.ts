import { Component, OnInit,Inject,ViewChild,ElementRef } from '@angular/core';
import {MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-modalbox',
  templateUrl: './modalbox.component.html',
  styleUrls: ['./modalbox.component.scss']
})
export class ModalboxComponent implements OnInit {
  url:any;
  spinner:boolean=true;
  constructor( @Inject(MAT_DIALOG_DATA) public data: any, private sanitizer: DomSanitizer,
  public dialogRef: MatDialogRef<ModalboxComponent>,) { }
 
  ngOnInit(): void {
     this.url=this.sanitizer.bypassSecurityTrustResourceUrl(this.data.link);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

 myLoadEvent(){
    setTimeout(()=>{
      this.spinner=false;
    },5000)
    
  }
}
