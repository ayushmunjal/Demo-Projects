import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import {AppRoutingModule}  from './app-routing.module'
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ActivityComponent } from './activity/activity.component';
import { SuccessComponent } from './success/success.component';
import { AboutComponent } from './about/about.component';
import {DataTableModule,DropdownModule,SharedModule} from 'primeng/primeng';
import { ActivityService } from './services/activity.service';
import { PersonService } from './services/person.service';

@NgModule({
  declarations: [
    AppComponent,    HomeComponent,
    ActivityComponent,    SuccessComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, AppRoutingModule,
    DataTableModule,SharedModule, HttpModule, DropdownModule
  ],
  providers: [PersonService,ActivityService],
  bootstrap: [AppComponent]
})
export class AppModule { }
