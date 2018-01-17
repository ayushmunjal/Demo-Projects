import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../services/activity.service';
import { PersonService } from '../services/person.service';
import {SelectItem} from 'primeng/primeng';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  activity;

  constructor(private activityService : ActivityService) { }

  ngOnInit() {
    this.getActivity();
  }

  getActivity(){
    this.activityService.getActivity().subscribe(
      data => {
        this.activity=data.map(a=>({value:a.id,label:a.name}));
        this.activity.unshift({value:null,label:"Select Activity"})
        console.log(JSON.stringify(data));
      },
      error => {
        console.log(error);
      }
    )
  }


}
