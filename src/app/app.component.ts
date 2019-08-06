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
      filteredClock[0].removeButtonPressed = true;
      setTimeout(() => {
        this.allClocks.splice(this.allClocks.indexOf(filteredClock[0]), 1);
      }, 501);
    }
  }

  addButtonAction = () => {
    var id = this.counter++;
    let clock = {
      id,
      addButtonPressed: true,
      removeButtonClicked: () =>{
        this.removeButtonClicked(id);
      }
    };

    this.allClocks.push(clock);
    setTimeout(() => {
      clock.addButtonPressed = false;
    },501);

  }
}
