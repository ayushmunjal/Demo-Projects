import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../services/activity.service';
import { Activity } from '../Models/Activity';
import { error } from 'util';
import { Jsonp } from '@angular/http/src/http';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  activity: any;

  constructor(private activityService : ActivityService) { }

  ngOnInit() {
    this.getActivity();
  }

  getActivity(){
    this.activityService.get().subscribe(
      data => {
        // this.activity=data.map(a=>({id:a.id,name:a.name,date:new Date().toLocaleDateString()}));
        this.activity=data; 
        console.log(JSON.stringify(data));
      },
      error => {
        console.log(error);
      }
    )
  }

}
