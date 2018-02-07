import { Component, OnInit,OnDestroy, ViewChild } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { SupplierService } from '../services/supplier.service';
import {SelectItem} from 'primeng/primeng';
import { Person } from '../Models/Person';
import { Router,ActivatedRoute } from '@angular/router';
import { PersonAll } from '../Models/PersonAll';

declare var jQuery;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  typeRef: { value: string; label: string; }[];
  loading: boolean;

  @ViewChild('personForm') form: any;

  submitBtn: string;
  modalHeader: string;
  type;
  person;
  errMsg="Server Error.. Please try after some time!";
  error={active:false,text:this.errMsg};
  
  constructor(private customerService : CustomerService, private _router: Router,
  private supplierService: SupplierService) { }

  ngOnInit() {
    this.person= {name:{first:'',last:''}};
    this.getType();
  }

  onSubmit(){
    if (this.form.valid) {

      this.submitBtn="loading..";

      var person= this.form.value;
      person.name={'first':person.first,'last':person.last};
      
      if (person.type.includes("Customer"))
        this.addCustomer(person);
      else
        this.addSupplier(person);
    }
  }

  addSupplier(person){
    this.supplierService.add(person).subscribe(data => this.responseHandle(),error=>this.handleError(error,"add"));
  }

  addCustomer(person){
    this.customerService.add(person).subscribe(data => this.responseHandle(),error=>this.handleError(error,"add"));
  }

  responseHandle(){
    jQuery('#add-form').modal('hide');
    this.error.active=false;
    this.loading=false;
    this._router.navigate(['/contacts']);
  }

  handleError(error,type){
    this.error.active=true;
    this.error.text = error.status==400 ? error.text() : this.errMsg;
    this.submitBtn=type;
  }
  
  add(){
    this.modalHeader = "Add New Contact";
    this.submitBtn = "Add";
    jQuery('#navigate-modal').modal('hide');
    jQuery('#add-form').modal('show');
    this.form.resetForm();
    this.ngOnInit();
    this.error.active=false;
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

  ngOnDestroy(){
    jQuery('#navigate-modal').modal('hide');
    jQuery('#add-form').modal('hide');
  }

}
