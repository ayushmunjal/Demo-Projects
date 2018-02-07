import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import { rendererTypeName } from '@angular/compiler';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/timeout';
import { Supplier } from '../Models/Supplier';
import { Subject } from 'rxjs/Subject';
import {Message} from 'primeng/api';
import {MessageService} from 'primeng/components/common/messageservice';

@Injectable()
export class SupplierService {
  
  private supplierStore = [];

  private supplierSubject = new Subject<any>();
  
  suppliers = this.supplierSubject.asObservable();

  url = 'http://localhost:5000/api/supplier/';

  msgs: Message[] = [];

  constructor(private http: Http, private messageService: MessageService) {
    this.getAll();
   }

  getAll(){
    this.http.get(this.url+'all')
    .timeout(15000)
    .subscribe((response:Response) => {
      this.supplierStore=response.json().map(a=>(Object.assign(a,{type:"Supplier"})));
      this.supplierSubject.next(this.supplierStore);
      console.log(this.supplierStore);
    },
      error=> this.handleError(error));
  }
  
  add(supplier):Observable<any>{
    return this.http.post(this.url+'add',supplier)
    .timeout(10000)
    .map((response:Response) => {
      this.supplierStore.push(Object.assign(response.json(),{type:"Supplier"}));
      this.supplierSubject.next(this.supplierStore);
      this.success("Contact added successfully!");
    })
    .catch(error=> this.handleError(error));
  }

  update(supplier):Observable<any>{
    return this.http.put(this.url+'update',supplier)
    .timeout(7000)
    .map((response:Response) => {
      console.log(this.supplierStore);
      this.supplierStore.splice(this.supplierStore.indexOf(a=>a.id==supplier.id),1);
      this.supplierStore.push(Object.assign(response.json(),{type:"Supplier"}));
      this.supplierSubject.next(this.supplierStore);
      this.success("Contact updated successfully!");
    })
    .catch(error=> this.handleError(error));
  }

  delete(supplier):Observable<any>{
    return this.http.delete(this.url+supplier.id)
    .timeout(7000)
    .map((response:Response) => {
      this.supplierStore.splice(this.supplierStore.indexOf(a=>a.id==supplier.id),1);
      this.supplierSubject.next(this.supplierStore);
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
