import { Component, OnInit } from '@angular/core';
import { ProductionService } from '../../services/production.service'
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
  providers: [DatePipe]
})
export class ReportComponent implements OnInit {
  data1: any
  data2: any

  date1: Date = new Date()
  date2: Date = new Date()

  lines: any
  selectedLine: any

  constructor(public api: ProductionService, private datePipe: DatePipe) { }

  async ngOnInit(): Promise<void> {
    this.getLines()
  }
  
  transformDate(date: Date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd HH:mm');
  }

  async submit() {
    console.log("date1: ", this.transformDate(this.date1))
    console.log("date2: ", this.transformDate(this.date2))
    console.log("selectedLine: ", this.selectedLine)
    
    let result = await this.api.BackendRequest({
      date1: this.transformDate(this.date1),
      date2: this.transformDate(this.date2),
      line: this.selectedLine.id
    }, "/production/checkpoints/debit")

    console.log("result: ", result)
    this.data1 = result.data.data1
    this.data2 = result.data.data2
  }

  async getLines(){
    let result = await this.api.BackendRequest("", "/production/lines")
    this.lines = result
    this.lines.unshift({name: "All", id: 0})
    this.selectedLine = this.lines[0]
  }

}
