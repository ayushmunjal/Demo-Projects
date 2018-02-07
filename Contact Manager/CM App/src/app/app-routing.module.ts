import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { ContactsComponent }   from './contacts/contacts.component';
import { HomeComponent }   from './home/home.component';
// import { SuccessComponent }   from './success/success.component';
import { HashLocationStrategy } from '@angular/common';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'contacts', component: ContactsComponent },
  // { path: 'success', component: SuccessComponent },
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