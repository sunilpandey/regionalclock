import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

interface State {
  name: string;
  population: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title;
  stateName1: string;
  allClocks = [];
  counter = 0;
  constructor() {
    this.stateName1 = "ABC"
    this.title = "Regional Clock"
  }

  removeButtonClicked = (id) => {
    var filteredClock = this.allClocks.filter((clock) => clock.id === id);
    if(filteredClock.length) {
      this.allClocks.splice(this.allClocks.indexOf(filteredClock[0]), 1);
    }
  }

  addButtonAction = () => {
    var id = this.counter++;
    this.allClocks.push({
      id,
      removeButtonClicked: () =>{
        this.removeButtonClicked(id);
      }
    });
  }
}
