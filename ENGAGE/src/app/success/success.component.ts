import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../services/activity.service';
import { PersonService } from '../services/person.service';
import { Activity } from '../Models/Activity';
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
  activities:Activity[];

  constructor(private activityService: ActivityService, private personService: PersonService) { }

  ngOnInit() {
    this.getActivity();
  }

  getActivity(){
    this.activityService.get().subscribe(
      data => {
        this.activities=data;
        this.getPersons();
      },
      error => {
        console.log(error);
      })
  }

  getPersons(){
    this.personService.get().subscribe(
      data => {
        this.persons=data.map(a=>(
          {
            id:a.id,
            name:(a.firstName+' '+a.lastName),
            activity:this.activities.filter(z=>z.id==a.activityId).map(a=>a.name)[0]
          }
        ));
        console.log(JSON.stringify(this.persons));
      },
      error => {
        console.log(error);
      })
  }

}
