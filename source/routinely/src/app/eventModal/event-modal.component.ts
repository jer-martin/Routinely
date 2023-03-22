import { Component } from "@angular/core";
import { SharerService } from "../sharer.service";
import { DateTime, Duration, DurationUnit, Interval } from 'luxon';
import { firstValueFrom,lastValueFrom } from "rxjs";
import { HttpClient } from "@angular/common/http";
interface IeventList{
  eventName: string
  eventCategory: string
  //description: string
}
@Component({
  selector: 'app-event-modal',
  templateUrl: './event-modal.component.html',
  styleUrls: ['./event-modal.component.css']
})
export class EventModalComponent {
  eventName = '';
  //description = 'Intro to Software Engineering'
  eventCategory = '';
  public eventList: IeventList[] =[]

  async addEvent(){
    this.basic = false;
    firstValueFrom(this.httpClient.post('/api/addEvent',{
      eventName: this.eventName,
      eventCategory: this.eventCategory
      //description: this.description
    }))
    this.eventName = '';
    //this.description = '';
    this.eventCategory = '';
  }
  async loadEvents(){
    const userList = await this.httpClient
    .get<IeventList[]>('/api/viewEvents')
    this.eventList = await lastValueFrom(userList)

   }
  constructor(private httpClient:HttpClient,private sharerService:SharerService) { }

  eventNames: string = '';
  //eventCategory: string = '';
  basic: boolean = false;
  colorHSL: string = this.sharerService.getAccentHSL();
  eventDate: DateTime = DateTime.now();

  // submit() {
  //   this.basic = false;
  //   console.log("name: " + this.eventNames + " cat: " + this.eventCategory + " date: ")
  // }
  submit() {
    this.basic = false;
    console.log("name: " + this.eventName + " cat: " + this.eventCategory + " date: " + this.eventDate.toFormat("yyyy-MM-dd") + " time: " + this.eventDate.toFormat("HH:mm:ss"));
  }
}
