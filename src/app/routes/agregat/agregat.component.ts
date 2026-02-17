import { Component, OnInit, Renderer2 } from '@angular/core';
import { IProduction } from 'src/app/models/production';
import { ProductionService } from 'src/app/services/production.service';

import { IAgregat } from '../../models/agregat'
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-agregat',
  templateUrl: './agregat.component.html',
  styleUrls: ['./agregat.component.css']
})


export class AgregatComponent implements OnInit {
  lastProduct: IProduction[]

  count: any
  byModel: any
  agregatToday: IAgregat[]
  
  time = new Date();
  intervalId: any;
  line: number = 19
  serial: String = ''
  sendSerial: String

  rest: any

  added: boolean = false
  addedText: string = "Kiritildi"

  someError: boolean = false
  errorText: string = '';

  constructor(public api: ProductionService, public renderer: Renderer2) { }

  async ngOnInit(): Promise<void> {
    this.intervalId = setInterval(() => {
      this.time = new Date();
    }, 1000);
    let line = {
      line: this.line
    }

    this.lastProduct = await this.api.getLast(line)
    console.log(this.lastProduct)
    this.count = await this.api.getToday(line)
    console.log(this.count)
    this.byModel = await this.api.getTodayByModels(line)
    console.log("bymodel: ",this.byModel)

    this.rest = await this.api.getSectorBalance(line)
    console.log(this.rest)
  }

  async submit(){
    let data = {
      serial: this.sendSerial,
      line: this.line
    }

    let result = await this.api.serialInput(data)
    this.serial = ''
    console.log("result: ", result)
    if(result.result == 'ok'){
      this.someError = false
      this.added = true
      this.errorText = ''
    }else{
      this.someError = true
      this.errorText = `${result.error}`
      return

    }
      let line = {
        line: this.line
      }
      this.lastProduct = await this.api.getLast(line)
      this.count = await this.api.getToday(line)
      this.byModel = await this.api.getTodayByModels(line)
      this.rest = await this.api.getSectorBalance(line)
      this.renderer.selectRootElement('#serial').focus()
      this.added = true
      setTimeout(()=>{
        this.added = false
      }, 3000)

  }

  change(){
    if(this.serial.includes('clear'))
    this.serial = ''
    if(this.serial.includes('refresh')){
      location.reload()
    }
    if(this.serial.length === 15){
      this.sendSerial = this.serial
      this.serial = ''
      this.submit()
    }
  }

  async exportExcel() {
    this.agregatToday = await this.api.getAgregatTodaySerial()
      import("xlsx").then(xlsx => {
          const worksheet = xlsx.utils.json_to_sheet(this.agregatToday);
          const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
          const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
          this.saveAsExcelFile(excelBuffer, "agregat");
      });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
      let year = new Date().getFullYear()
      let month = new Date().getMonth()
      let day = new Date().getDay()
      let hour = new Date().getHours()
      let minut = new Date().getMinutes()
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
          type: EXCEL_TYPE
      });
      // FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
      FileSaver.saveAs(data, fileName + '_export_' + `${year}_${month}_${day}-${hour}_${minut}` + EXCEL_EXTENSION);
  }

}
