import { Component } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { Userservice } from '../userservice';
import * as _ from 'lodash';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['Today','Last 7 Days', 'Current Month', 'Current Year'];
  barChartType: ChartType = 'doughnut';
  barChartLegend = true;
  barChartPlugins = [];

  public barChartData: any = [
    { data: [] }
  ];




  constructor(private userService : Userservice,
    private datepipe : DatePipe)
  {
    let today = new Date().toJSON();

    let lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 6);    
    let sevenDays = lastWeek.toJSON();
    console.log("sevenDays", sevenDays);

    let date = new Date();
    let firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
    let currentMonth = firstDay.toJSON();

    let currentYear = new Date();
    currentYear.setFullYear(currentYear.getFullYear(), 0,1);    
    let newYear = currentYear.toJSON();
    console.log("newYear", newYear);
   

    this.userService.getAllUsers().subscribe((data : any) => {
      let userData = data.docs;     
      console.log("total Users", userData) ;
      let newdate = userData.map((obj : any)  => obj.registerDate);
      
      
      // today Users Count
      let todayNewUsers = 0;
      let todayUsersList = [];
      for(let obj of newdate){
        if(today.substring(0,10) == obj.substring(0,10)){
          todayNewUsers++;
          todayUsersList.push(obj);
        }
      }
      console.log(todayNewUsers)
      console.log(todayUsersList)
          //  

          // Last Seven Days
          let sevenDaysCount = 0;
          let sevenDaysUser = [];
          for(let obj of newdate)
          {
            if(today.substring(0,10) >= obj.substring(0,10) && sevenDays.substring(0,10) <= obj.substring(0,10))            
            {
              sevenDaysCount++;
              sevenDaysUser.push(obj);
            }
          }

          console.log("seventdayuserlist", sevenDaysUser);
          console.log("sevendayCount", sevenDaysCount);
          // 

          // Current Month User Count
          let currentMonthUser = 0;
          let monthUser = [];
          for(let month of newdate)
          {
            if(today.substring(0,10) >= month.substring(0,10) && currentMonth.substring(0,10) <= month.substring(0,10))
            {
              currentMonthUser++;
              monthUser.push(month);
            }
          }

          console.log("monthUser", currentMonthUser);
          console.log("monthUserli", monthUser);
          //

          // Current Year User List

          let currentYearCount = 0;
          let currentYearUser = [];
          for(let year of newdate)
          {
            if(newYear.substring(0,10) <= year.substring(0,10) && today.substring(0,10) >= year.substring(0,10))
            {
              currentYearCount++;
              currentYearUser.push(year);
            }
          }

          console.log("yearCount", currentYearCount);
          console.log("yearUser", currentYearUser);
          // year end


      this.barChartData = [{label: "New Users List", data: [todayNewUsers, sevenDaysCount, currentMonthUser, currentYearCount] },];

    })



  }



}
