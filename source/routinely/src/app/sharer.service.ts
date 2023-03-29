// sharer.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DateTime } from 'luxon';

@Injectable({
  providedIn: 'root'
})
export class SharerService {
  private calTimeSource = new BehaviorSubject<DateTime>(DateTime.local());
  currentCalTime = this.calTimeSource;
  private calTime: DateTime = DateTime.local(); // Provide an initial value to the calTime property
  private color: string = "blue";
  private eventStorage : Map<number, string[]> = new Map<number, string[]>(); // local storage for events (temp until we get databases working)

  constructor() { }

  changeCalTime(calTime: DateTime) {
    this.calTime = calTime;
    this.calTimeSource.next(calTime);
  }

  addEvent(dt: DateTime, name : string) { // only dates and names necessary for now
    // key is DateTime, val is array of event names (strings)
    console.log(dt);
    // console.log(name);
    if (this.eventStorage.get(dt.day) != undefined) {
      // @ts-ignore
      this.eventStorage.set(dt, this.eventStorage.get(dt).concat(name));
    }
    else {
      let events: string[] = [name];
      this.eventStorage.set(dt.day, events);
    }
    // console.log(this.eventStorage.get(dt));
  }

  getEvents() {
    return this.eventStorage;
  }

  getCalTimeSource() {
    return this.calTimeSource;
  }

  getColor() {
    return this.color;
  }

  setColor(color: string) {
    this.color = color;
  }

  getTextColor() {
    if (this.color === "purple" || this.color === "slate") {
      return "white";
    }
    else {
      return "black";
    }
  }

  getColorHSL() {
    if (this.color === "blue") {
      return "hsl(198, 78%, 78%)";
    }
    else if (this.color === "purple") {
      return "hsl(282, 44%, 62%)";
    }
    else if (this.color === "slate") {
      return "hsl(198, 0%, 30%)";
    }
    else {
      return "hsl(0, 0%, 0%)";
    }
  }

  getAccentHSL() {
    if (this.color === "blue") {
      return "hsl(198, 100%, 32%)";
    }
    else if (this.color === "purple") {
      return "hsl(282, 44%, 52%)";
    }
    else if (this.color === "slate") {
      return "hsl(198, 0%, 20%)";
    }
    else {
      return "hsl(0, 0%, 0%)";
    }
  }


}
