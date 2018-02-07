import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { SupplierService } from '../services/supplier.service';
import { PersonAll } from '../Models/PersonAll';
import { Person } from '../Models/Person';
import { error } from 'util';
import { Jsonp } from '@angular/http/src/http';
@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {
  persons;
  activities:PersonAll[];

  constructor(private customerService: CustomerService, private supplierService: SupplierService) { }

  ngOnInit() {
//    this.getActivity();
  }

  // getActivity(){
  //   this.customerService.get().subscribe(
  //     data => {
  //       this.activities=data;
  //       this.getPersons();
  //     },
  //     error => {
  //       console.log(error);
  //     })
  // }

  // getPersons(){
  //   this.supplierService.get().subscribe(
  //     data => {
  //       this.persons=data.map(a=>(
  //         {
  //           id:a.id,
  //           name:(a.firstName+' '+a.lastName),
  //           activity:this.activities.filter(z=>z.id==a.activityId).map(a=>a.name)[0]
  //         }
  //       ));
  //       console.log(JSON.stringify(this.persons));
  //     },
  //     error => {
  //       console.log(error);
  //     })
  // }

}
