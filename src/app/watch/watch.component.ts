import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import * as moment from "moment-timezone"
interface City {
  geoname_id;
  locale_code;
  continent_code;
  continent_name;
  country_iso_code;
  country_name;
  subdivision_1_iso_code;
  subdivision_1_name;
  subdivision_2_iso_code;
  subdivision_2_name;
  city_name;
  metro_code;
  time_zone;
  is_in_european_union;
}

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.css']
})
export class WatchComponent implements OnInit, OnDestroy{
  title;
  cities: City[];
  cityCtrl: FormControl;
  filteredCities: Observable<{}[]>;
  @Input() cityName: string;
  selectedCity: City;
  editingStarted: boolean;
  @Output() removeButtonClicked: EventEmitter<void> = new EventEmitter<void>();
  clockInterval: number;
  currentTime: Observable<string>;
  constructor() {
    this.title = "Clock"    
    this.cities = [{
      geoname_id: 1261481,
      locale_code: "en",
      continent_code: "AS",
      continent_name: "Asia",
      country_iso_code: "IN",
      country_name: "India",
      subdivision_1_iso_code: "DL",
      subdivision_1_name: "National Capital Territory of Delhi",
      subdivision_2_iso_code: "",
      subdivision_2_name: "",
      city_name: "New Delhi",
      metro_code: null,
      time_zone: "Asia/Kolkata",
      is_in_european_union: 0
    },
    {
      geoname_id: 1176615,
      locale_code: "en",
      continent_code: "AS",
      continent_name: "Asia",
      country_iso_code: "PK",
      country_name: "Pakistan",
      subdivision_1_iso_code: "IS",
      subdivision_1_name: "Islamabad",
      subdivision_2_iso_code: "",
      subdivision_2_name: "",
      city_name: "Islamabad",
      metro_code: null,
      time_zone: "Asia/Karachi",
      is_in_european_union: 0
    },
    {
      geoname_id: 1185092,
      locale_code: "en",
      continent_code: "AS",
      continent_name: "Asia",
      country_iso_code: "BD",
      country_name: "Bangladesh",
      subdivision_1_iso_code: "F",
      subdivision_1_name: "Rangpur Division",
      subdivision_2_iso_code: "64",
      subdivision_2_name: "Thakurgaon",
      city_name: "Thakurgaon",
      metro_code: null,
      time_zone: "Asia/Dhaka",
      is_in_european_union: 0
    },
    {
      geoname_id: 1792520,
      locale_code: "en",
      continent_code: "AS",
      continent_name: "Asia",
      country_iso_code: "CN",
      country_name: "China",
      subdivision_1_iso_code: "BJ",
      subdivision_1_name: "Beijing",
      subdivision_2_iso_code: "",
      subdivision_2_name: "",
      city_name: "Tongzhou",
      metro_code: null,
      time_zone: "Asia/Shanghai",
      is_in_european_union: 0
    },
    {
      geoname_id: 1850147,
      locale_code: "en",
      continent_code: "AS",
      continent_name: "Asia",
      country_iso_code: "JP",
      country_name: "Japan",
      subdivision_1_iso_code: "13",
      subdivision_1_name: "Tokyo",
      subdivision_2_iso_code: "",
      subdivision_2_name: "",
      city_name: "Tokyo",
      metro_code: null,
      time_zone: "Asia/Tokyo",
      is_in_european_union: 0
    }]
    this.editingStarted = false;
    this.cityCtrl = new FormControl();
    this.filteredCities = this.cityCtrl.valueChanges
      .pipe(
        startWith(''),
        map(city => city ? this._filtercities(city) : this.cities.slice())
      );

  }

  doneButtonAction = () => {
    if(this.cityName) {
      var filteredcityname = this._filtercities(this.cityName);
      if(filteredcityname.length !== 0) {
        this.selectedCity = filteredcityname[0];
        clearInterval(this.clockInterval);
        this.currentTime = new Observable((observer) => {
          this.clockInterval = window.setInterval(() => observer.next(moment(new Date()).tz(this.selectedCity.time_zone).format("hh: mm: ss")), 100)
        });
        this.editingStarted = false;
      } else {
        this.editingStarted = true;
      }
    }
  }



  editButtonAction = () => {
    this.editingStarted = true;
  }
  removeButtonAction = () => {
    this.removeButtonClicked.emit();
  }
  cancelButtonAction = () => {
    if(this.selectedCity) {
      this.cityName = this.selectedCity.city_name;
      this.editingStarted = false;
    }else {
      this.cityName = undefined;
    }
  }
  private _filtercities(value: string): City[] {
    const filterValue = value.toLowerCase();

    return this.cities.filter(city => city.city_name.toLowerCase().indexOf(filterValue) === 0);
  }

  ngOnDestroy() {
    window.clearInterval(this.clockInterval);
  }

  ngOnInit() {
    if(this.cityName) {
      var filteredcityname = this._filtercities(this.cityName);
      if(filteredcityname.length !== 0) {
        this.selectedCity = filteredcityname[0];
      }else{
        this.editingStarted = true;
      }
    }else {
      this.editingStarted = true;
    }
  }
}
