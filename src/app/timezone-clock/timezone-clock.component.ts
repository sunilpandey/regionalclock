import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-timezone-clock',
  templateUrl: './timezone-clock.component.html',
  styleUrls: ['./timezone-clock.component.css']
})
export class TimezoneClockComponent implements OnInit {

  @Input()
  timeZone: string;
  @Input()
  format: string;
  moment: moment.Moment;
  currentTime: string;
  constructor() {
    this.timeZone = "Asia/Kolkata";
    this.format = "hh: mm: ss";
    this.moment = moment();
    this.currentTime = this.moment.tz(this.timeZone).format(this.format);
    setTimeout(() => {
      this.currentTime = this.moment.tz(this.timeZone).format(this.format);
    }, 100)
  }

  ngOnInit() {
  }

}
