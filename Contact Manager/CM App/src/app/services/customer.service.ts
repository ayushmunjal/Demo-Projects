import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import { rendererTypeName } from '@angular/compiler';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/timeout';
import { Subject } from 'rxjs/Subject';
import { Customer } from '../Models/Customer';
import {Message} from 'primeng/api';
import {MessageService} from 'primeng/components/common/messageservice';

@Injectable()
export class CustomerService {

  private customerStore = [];
  private customerSubject = new Subject<any>();
  customers = this.customerSubject.asObservable();

  url = 'http://localhost:5000/api/customer/';

  msgs: Message[] = [];

  constructor(private http: Http, private messageService: MessageService) {
    this.getAll();
   }

  getAll(){
    this.http.get(this.url+'all')
    .timeout(15000)
    .subscribe((response:Response) => {
      this.customerStore = response.json().map(a=>Object.assign(a,{type:"Customer"}));
      console.log(response.json());
      console.log(this.customerStore);
      this.customerSubject.next(this.customerStore);
    },
      error=> this.handleError(error));
  }

  add(customer):Observable<any>{
    return this.http.post(this.url+'add',customer)
    .timeout(10000)
    .map((response:Response) => {
      this.customerStore.push(Object.assign(response.json(),{type:"Customer"}));
      this.customerSubject.next(this.customerStore);
      this.success("Contact added successfully!");})
    .catch(error=> this.handleError(error));
  }

  update(customer):Observable<any>{
    return this.http.put(this.url+'update',customer)
    .timeout(10000)
    .map((response:Response) => {
      this.customerStore.splice(this.customerStore.indexOf(a=>a.id==customer.id),1);
      this.customerStore.push(Object.assign(response.json(),{type:"Customer"}));
      this.customerSubject.next(this.customerStore);
      this.success("Contact updated successfully!");
    })
    .catch(error=> this.handleError(error));
  }

  
  delete(customer):Observable<any>{
    return this.http.delete(this.url+customer.id)
    .timeout(7000)
    .map((response:Response) => {
      this.customerStore.splice(this.customerStore.indexOf(a=>a.id==customer.id),1);
      this.customerSubject.next(this.customerStore);
      this.success("Contact deleted successfully!");
    })
    .catch(error=> this.handleError(error));
  }

  private success(msg){
    this.messageService.add({severity:'success', summary:msg});
  }
  
  private handleError (error: Response | any) {
    console.log(error);
    if(error.status!=400)
      this.messageService.add({severity:'error', summary: 'Server error occurred! Please try after some time!'});
    return Observable.throw(error);
  }
}
