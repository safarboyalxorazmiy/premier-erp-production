import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductionService } from 'src/app/services/production.service';

@Component({
  selector: 'app-report2',
  templateUrl: './report2.component.html',
  styleUrls: ['./report2.component.css']
})
export class Report2Component implements OnInit {
    countPacking: any
  byModelPacking: any

  todayStatistics: any

  token = {
    token: ""
  }
  loaded: boolean = false

  constructor(public api: ProductionService) { }

  async ngOnInit(): Promise<void> {

    

    this.token.token = localStorage.getItem("token") || ""
    // this.getData()

    this.todayStatistics = await this.api.TodayStatistics(this.token) 
    console.log(this.todayStatistics)
    if (this.todayStatistics.result != "ok") {
      this.loaded = false
    }else{
      this.loaded = true
    }

    setInterval(async ()=>{
      this.todayStatistics = await this.api.TodayStatistics(this.token) 
      // this.plan = await this.api.TodayPlan(this.token)
    }, 5000)
  }

}
