import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {Constants, PublicHoliday} from '../const';

class RemainingTime {
  seconds = 0;
  minutes = 0;
  hours = 0;
  days = 0;
  publicHolidays: PublicHoliday[] = [];
  workDays = 0;
  weekends = 0;
}

class RemainingTimer {
  seconds: number;
  minutes: number;
  hours: number;
  days: number;
  workDays: number;
  weekends: number;
}

@Component({
  selector: 'rt-app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  remainingTime: RemainingTime = new RemainingTime();
  showPublicHolidayDetail = false;
  private readonly remainingTimer: RemainingTimer = new RemainingTimer();
  model = {
    left: true, middle: false, right: false
  };

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.initTimer();
//    setInterval(() => {
//      this.http.get('https://wedding-rt.herokuapp.com/home');
//      this.http.get('www.seznam.cz');
//      console.log('setInterval');
//    }, 30000); // every 5 minutes (300000)

  }

  private initTimer() {
    // days
    this.remainingTime.days = Constants.remainingDays();
    this.remainingTime.publicHolidays = Constants.remainingPublicHolidays();
    this.remainingTimer.days = window.setInterval(() => {
      this.remainingTime.days = Constants.remainingDays();
      this.remainingTime.publicHolidays = Constants.remainingPublicHolidays();
    }, Constants.ONE_DAY_IN_MS);

    // hours
    this.remainingTime.hours = Constants.remainingHours();
    this.remainingTimer.hours = window.setInterval(() => {
      this.remainingTime.hours = Constants.remainingHours();
    }, Constants.ONE_HOUR_IN_MS);

    // minutes
    this.remainingTime.minutes = Constants.remainingMinutes();
    this.remainingTimer.minutes = window.setInterval(() => {
      this.remainingTime.minutes = Constants.remainingMinutes();
    }, Constants.ONE_MINUTE_IN_MS);

    // seconds
    this.remainingTimer.seconds = window.setInterval(() => {
      this.remainingTime.seconds = Constants.remainingSeconds();
    }, Constants.ONE_SECOND_IN_MS);
  }

}
