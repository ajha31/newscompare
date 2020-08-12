import { Component, OnInit, HostListener } from '@angular/core';
import {news,channels} from '../../models/models';
import {AllService} from '../../services/all.service'

@Component({
  selector: 'app-allnews',
  templateUrl: './allnews.component.html',
  styleUrls: ['./allnews.component.scss']
})
export class AllnewsComponent implements OnInit {

  title = 'news';
  larticles:news[];marticles:news[];carticles:news[];
  libchan:channels[];conchan:channels[];modchan:channels[];
  lwidth:boolean;mwidth:boolean;cwidth:boolean;
  width:any;
  height:any;
  @HostListener ('window:resize', ['$event'])
  onResize(event) {
  this.width = window.innerWidth;
  this.setwidth(this.width)
  }
  @HostListener ('window:scroll', ['$event'])
  onScroll(event){
    this.height=window.pageYOffset;
  }
  constructor(private services:AllService) { }

  ngOnInit():void{
    this.width = window.innerWidth;
    this.setwidth(this.width)
    
    this.services.getlibchan().subscribe(channel => {
      this.libchan=channel;
    });

    this.services.getconchan().subscribe(c=>{
      this.conchan=c;
    })

    this.services.getmodchan().subscribe(c=>{
      this.modchan=c;
    })
    
  }
  getlNews(ch){
    this.services.getnews(ch).subscribe(n=>{
      this.larticles=n;
    })
  }
  getmNews(ch){
    this.services.getnews(ch).subscribe(n=>{
      this.marticles=n;
      
    })
  }
  getcNews(ch){
    this.services.getnews(ch).subscribe(n=>{
      this.carticles=n;
    })
  }
  setwidth(w){
    if(w>600){
      this.lwidth=false;
     this. mwidth=true;
     this.cwidth=false;
    }
    if(w<600){
      this.lwidth=true;
     this. mwidth=true;
     this.cwidth=true;
    }
  }

}
