import { Component, OnInit, Renderer2 } from '@angular/core';
import { IProduction } from 'src/app/models/production';
import { ProductionService } from 'src/app/services/production.service';

@Component({
  selector: 'app-laboratory',
  templateUrl: './laboratory.component.html',
  styleUrls: ['./laboratory.component.css']
})
export class LaboratoryComponent implements OnInit {

  lastProduct: IProduction[]
  count: any
  byModel: any
  
  time = new Date();
  intervalId: any;
  line: number = 11
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
  }

  async submit(){
    let data = {
      serial: this.sendSerial,
      line: this.line
    }

    let result = await this.api.serialInput(data)
    this.serial = ''
    console.log("result: ", result)
    if(result.result != 'ok'){
      this.someError = true
      this.added = false
      this.errorText = `${result.error}`
      return
    }else{
      this.someError = false
      this.errorText = ''
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





}
