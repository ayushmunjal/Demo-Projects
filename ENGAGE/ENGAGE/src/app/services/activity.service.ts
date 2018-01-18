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
export class ActivityService {

  url = 'http://localhost:5000/api/values/activities';

  constructor(private http: Http) { }

  get():Observable<Activity[]>{
    return this.http.get(this.url)
    .timeout(3000)
    .map((response:Response) => response.json())
    .catch(this.handleError);
  }
  
  private handleError (error: Response | any) {
    console.error('CurrencyService:', error);
    return Observable.throw(error);
  }

}
