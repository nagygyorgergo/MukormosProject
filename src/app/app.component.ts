import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  page = '';
  routes: Array<string> =[];

  constructor(private router: Router, public afAuth: AngularFireAuth){}

  ngOnInit(){
    this.routes = this.router.config.map(conf => conf.path) as string[];
    console.log(this.routes);

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((evts: any) => {
      const currentPage = (evts.urlAfterRedirects as string).split('/')[1] as string;

      if(this.routes.includes(currentPage)){
        this.page=currentPage;
      }
    });
  }

  changePage(selectedPage: string){
    //this.page=selectedPage;
    this.router.navigateByUrl(selectedPage);
  }

  onToggleSidenav(sidenav: MatSidenav){
    sidenav.toggle();
  }

  onClose(event: any, sidenav: MatSidenav){
    if (event === true){
      sidenav.close();
    }
  }

  logout(): void{
    this.afAuth.signOut();
  }
}
