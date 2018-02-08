import { Component, OnInit,DoCheck, ViewChild  } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { SupplierService } from '../services/supplier.service';
import { PersonAll } from '../Models/PersonAll';
import { error } from 'util';
import { Jsonp } from '@angular/http/src/http';
import { filterQueryId } from '@angular/core/src/view/util';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';
import { ConfirmationService } from 'primeng/api';

declare var jQuery;

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit, OnDestroy,DoCheck {

  typeRef;
  persons:any;
  person:any;
  loading : boolean=true;
  modalHeader="Add";
  submitBtn="Add";
  customers;
  suppliers;
  search;
  errMsg="Server Error.. Please try after some time!";
  error={active:false,text:this.errMsg};

  customerSubscription : Subscription;
  supplierSubscription : Subscription;

  @ViewChild('personForm') form: any;

  constructor(private customerService : CustomerService, private supplierService : SupplierService,
    private confirmationService: ConfirmationService) {
    this.supplierSubscription = this.supplierService.suppliers.subscribe(suppliers=>this.suppliers=suppliers);
    this.customerSubscription = this.customerService.customers.subscribe(customers=>this.customers=customers);
    
  }

  ngOnInit() {
    this.person= {name:{first:'',last:''}};
    this.getType();
    this.customerService.getAll();
    this.supplierService.getAll();
  }

  personAll(){
    if (this.customers && this.suppliers) {
      return this.customers.concat(this.suppliers).sort((a,b) => a.id < b.id ? 1 : 0 );
    }
  }

  ngDoCheck(){
    if (this.customers && this.suppliers) 
      this.loading=false;
  }

  onSubmit(){
    if (this.form.valid) {

      var add = true;
      if (this.submitBtn!="Add")
        add=false;

      this.loading=true;
      this.submitBtn="loading..";

      var person= this.form.value;
      person.name={'first':person.first,'last':person.last};
      
      if (add) {
        if (person.type.includes("Customer"))
          this.addCustomer(person);
        else
          this.addSupplier(person);
        }
      else{
        if (person.type.includes("Customer"))
          this.updateCustomer(person);
        else
          this.updateSupplier(person);
      }
    }
  }

  addSupplier(person){
    this.supplierService.add(person).subscribe(data => this.responseHandle(),error=>this.handleError(error,"add"));
  }

  updateSupplier(person){
    this.supplierService.update(person).subscribe(data => this.responseHandle(),error=>this.handleError(error,"update"));
  }

  addCustomer(person){
    this.customerService.add(person).subscribe(data => this.responseHandle(),error=>this.handleError(error,"add"));
  }

  updateCustomer(person){
    this.customerService.update(person).subscribe(data => this.responseHandle(),error=>this.handleError(error,"update"));
  }

  edit(person){
    this.modalHeader = "Edit Details - " + person.type;
    this.submitBtn = "Update";
    this.ngOnInit();
    this.error.active=false;
    this.person=person;
    this.typeRef=this.typeRef.filter(a=>a.label==person.type);
    if(person.birthday)
      this.person.birthday=new Date(person.birthday).toLocaleDateString("en-US");
  }

  add(){
    this.modalHeader = "Add New Contact";
    this.submitBtn = "Add";
    this.form.resetForm();
    this.ngOnInit();
    this.error.active=false;
  }

  delete(person){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.loading=true;
          if (person.type=="Customer")
            this.customerService.delete(person).subscribe(data=>this.loading=false);
          else
            this.supplierService.delete(person).subscribe(data=>this.loading=false)
      }
    });
  }

  getType(){
    this.typeRef = [{value:null,label:"Select Type"},
    {value:"Customer",label:"Customer"},
    {value:"Supplier",label:"Supplier"}];
  }

  isType(type){
    if (this.person.type==type)
      return true;
    return false;
  }

  responseHandle(){
    jQuery('#add-edit-form').modal('hide');
    this.error.active=false;
    this.loading=false;
  }

  handleError(error,type){
    this.error.active=true;
    this.submitBtn=type;
    this.error.text = error.status==400 ? error.text() : this.errMsg;
  }

  ngOnDestroy(): void {
    this.customerSubscription.unsubscribe();
    this.supplierSubscription.unsubscribe();
  }

}
