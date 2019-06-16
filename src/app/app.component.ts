import { Component } from '@angular/core';
import * as moment from 'moment-timezone';
import { HttpClient } from '@angular/common/http';
// import {MatAutocomplete} from '@angular/material/autocomplete';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentTime:string;
  moment: moment.Moment;
  constructor(private http: HttpClient) {
    this.moment = moment();
    // this.http.get("").subscribe((data: any) => {

    // })
    this.currentTime = moment(new Date()).tz('America/New_York').format("HH:mm:ss z");    
    setInterval(() => {
      this.currentTime = moment(new Date()).tz('America/New_York').format("HH:mm:ss z");
    }, 200);
  }

}
