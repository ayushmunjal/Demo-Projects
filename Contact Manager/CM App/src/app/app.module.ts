import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';
import {AppRoutingModule}  from './app-routing.module'
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ContactsComponent } from './contacts/contacts.component';
import { SuccessComponent } from './success/success.component';
import {DataTableModule,DropdownModule,SharedModule, CalendarModule, GrowlModule,InputTextModule,
  TooltipModule, ConfirmDialogModule, ConfirmationService, MessagesModule, MessageModule} from 'primeng/primeng';
import {MessageService} from 'primeng/components/common/messageservice';
import { CustomerService } from './services/customer.service';
import { SupplierService } from './services/supplier.service';

@NgModule({
  declarations: [
    AppComponent,    HomeComponent,
    ContactsComponent//,    SuccessComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, AppRoutingModule, FormsModule,
    DataTableModule,SharedModule, HttpModule, DropdownModule, CalendarModule,InputTextModule,
    TooltipModule, ConfirmDialogModule, GrowlModule, MessagesModule, MessageModule
  ],
  providers: [CustomerService,SupplierService, ConfirmationService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
