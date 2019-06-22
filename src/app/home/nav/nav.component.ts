import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { TriangleService } from '../../triangle.service'
import { Subscription } from 'rxjs';

@Component({
  selector: 'safc-home-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class NavComponent implements OnInit, OnDestroy {

  constructor(private triangle: TriangleService, private router: Router){}

  hamburgerActive: Boolean;
  triangleActive: Boolean;

  triangleSubscription: Subscription;
  routerSubscription: Subscription;

  ngOnInit(){
    //check if triangle is enabled or disabled
    this.triangleSubscription = this.triangle.triangleEnabled.subscribe((bool: Boolean) => {
      this.triangleActive = bool;
    });
    //look for url changes
    this.routerSubscription = this.router.events.subscribe((event: Event) => {
      if(event instanceof NavigationEnd) {
        //show triangle if going to home page
        if(event.url != "/home"){
          this.triangle.hideTriangle();
        } else if(event.url == "/home"){
          this.triangle.showTriangle();
        }
      }
    });
    //show triangle if going to home page *on first load*
    if(this.router.url != "/home"){
      this.triangle.hideTriangle();
    } else if(this.router.url == "/home"){
      this.triangle.showTriangle();
    }
  }

  ngOnDestroy(){
    this.triangleSubscription.unsubscribe();
    this.routerSubscription.unsubscribe();
  }

  //toggle mobile navigation page
  toggleHamburger(){
    this.hamburgerActive = !this.hamburgerActive;
    if(this.hamburgerActive){
      document.querySelector("body").classList.add("noScroll");
    } else{
      document.querySelector("body").classList.remove("noScroll");
    }
  }

  //exit mobile navigation page on clicking a link
  exitHamburgerOnLinkClick(){
    this.hamburgerActive = false;
    document.querySelector("body").classList.remove("noScroll");
  }

}
