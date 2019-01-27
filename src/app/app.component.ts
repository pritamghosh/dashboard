import { Component } from '@angular/core';
import { Routes, RouterModule, Router, NavigationEnd } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { SearchFlightComponent } from './features/search-flight/search-flight.component';

const routes: Routes = [
  {
    path: '',  redirectTo: '/home' , pathMatch: 'full'
  },
  {
    path: 'home', 
    component: HomeComponent,
  },
  {
    path: 'searchFlight', 
    component: SearchFlightComponent,
  }
];
export const routing = RouterModule.forRoot(routes);
@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent {

  constructor(private router: Router) { }
  
  ngOnInit() {
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0)
        });
    }
}
