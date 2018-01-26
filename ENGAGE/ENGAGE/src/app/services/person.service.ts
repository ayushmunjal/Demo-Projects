import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import { rendererTypeName } from '@angular/compiler';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/timeout';
import { Activity } from '../Models/Activity';
import { Person } from '../Models/Person';

@Injectable()
export class PersonService {
  
  url = 'http://localhost:5000/api/values/';

  constructor(private http: Http) { }

  get():Observable<Person[]>{
    return this.http.get(this.url+'persons')
    .timeout(5000)
    .map((response:Response) => response.json())
    .catch(this.handleError);
  }
  
  add(person:Person):Observable<any>{
    let formData: FormData = new FormData(); 
    formData.append('firstName',person.firstName);
    formData.append('lastName',person.lastName);
    formData.append('email',person.email);
    formData.append('activityId',person.activityId);
    formData.append('comments',person.comments);
    return this.http.post(this.url+'add',formData)
    .timeout(7000)
    .map((response:Response) => response)
    .catch(this.handleError);
  }

  private handleError (error: Response | any) {
    console.error('CurrencyService:', error);
    return Observable.throw(error);
  }

}
