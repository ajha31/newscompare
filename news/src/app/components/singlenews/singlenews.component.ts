import { Component, OnInit, HostListener } from '@angular/core';
import {ActivatedRoute} from  "@angular/router"
import {Router} from '@angular/router'
import {news,channels} from '../../models/models';
import {AllService} from '../../services/all.service'

@Component({
  selector: 'app-singlenews',
  templateUrl: './singlenews.component.html',
  styleUrls: ['./singlenews.component.scss']
})
export class SinglenewsComponent implements OnInit {

  title = 'news';
  larticles:news[];
  marticles:news[];
  carticles:news[];
  libchan:channels[];
  conchan:channels[];
  modchan:channels[];
  ur:string;
  heading:string;
  height:any;

  @HostListener ('window:scroll', ['$event'])
  onScroll(event){
    this.height=window.pageYOffset;
    console.log(this.height);
  }

  constructor(private services:AllService,private route:Router) { }

  ngOnInit():void{
    this.ur=this.route.url
    
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
    this.services.getsinglenews(ch,this.ur).subscribe(n=>{
      this.larticles=n;
      this.heading=this.larticles[0].heading;
    })
  }
  getmNews(ch){
    this.services.getsinglenews(ch,this.ur).subscribe(n=>{
      this.marticles=n;
    })
  }
  getcNews(ch){
    this.services.getsinglenews(ch,this.ur).subscribe(n=>{
      this.carticles=n;
    })
  }


}
