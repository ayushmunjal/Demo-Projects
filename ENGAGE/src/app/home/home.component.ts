import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivityService } from '../services/activity.service';
import { PersonService } from '../services/person.service';
import {SelectItem} from 'primeng/primeng';
import { Person } from '../Models/Person';
import { Router,ActivatedRoute } from '@angular/router';

declare var jQuery;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  error: boolean;
  activity;
  person: Person;
  @ViewChild('personForm') form: any;

  constructor(private activityService : ActivityService, private _router: Router,
  private personService: PersonService) { }

  ngOnInit() {
    this.person = new Person();
    this.getActivity();
  }

  getActivity(){
    this.activityService.get().subscribe(
      data => {
        this.activity=data.map(a=>({value:a.id,label:a.name}));
        this.activity.unshift({value:null,label:"Select Activity"})
        console.log(JSON.stringify(data));
      },
      error => {
        this.error=true;
        console.log(error);
      }
    )
  }

  onSubmit(){
    if (this.form.valid) {
      console.log(JSON.stringify(this.form.value));
      this.personService.add(this.form.value).subscribe(
        data => {
          console.log(data);
          jQuery('#sign-up-form').modal('hide');
          this._router.navigate(['/success']);
          console.log("Form Submitted!"+JSON.stringify(this.form.value));
          this.form.reset();
          this.form.form.markAsPristine();
          this.error=false;
        },
        error => {
          this.error=true;
          console.log(error);
        })
      
    }
  }

}
