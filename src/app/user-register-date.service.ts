import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserRegisterDateService {

  constructor() { }

  today()
  {
    let today = new Date().toJSON();
    return today;
  }

  sevenDays()
  {
    let lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 6);    
    let sevenDays = lastWeek.toJSON();
    return sevenDays;
  }

  currentMonth()
  {
    let date = new Date();
    let firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
    let currentMonth = firstDay.toJSON();
    return currentMonth;
  }

  currentYear()
  {
    let currentYear = new Date();
    currentYear.setFullYear(currentYear.getFullYear(), 0,1);    
    let newYear = currentYear.toJSON();
    return newYear;
  }
}
