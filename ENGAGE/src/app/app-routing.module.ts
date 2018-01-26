import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { AboutComponent }   from './about/about.component';
import { ActivityComponent }   from './activity/activity.component';
import { HomeComponent }   from './home/home.component';
import { SuccessComponent }   from './success/success.component';
import { HashLocationStrategy } from '@angular/common';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'aboutUs', component: AboutComponent },
  { path: 'activities', component: ActivityComponent },
  { path: 'success', component: SuccessComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}