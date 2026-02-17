import { Component, OnInit, Renderer2 } from '@angular/core';
import { IProduction } from 'src/app/models/production';
import { ProductionService } from '../../services/production.service'

@Component({
  selector: 'app-vakum',
  templateUrl: './vakum.component.html',
  styleUrls: ['./vakum.component.css']
})
export class VakumComponent implements OnInit {

  constructor(public api: ProductionService, public renderer: Renderer2) { }

  lastProduct: IProduction[]
  count: any
  byModel: any
  time = new Date();
  intervalId: any;
  line: number = 1
  serial: String = ''
  sendSerial: String

  rest: any

  added: boolean = false
  addedText: string = "Kiritildi"

  someError: boolean = false
  errorText: string = '';

  async ngOnInit(): Promise<void> {

    this.intervalId = setInterval(() => {
      this.time = new Date();
    }, 1000);
    let line = {
      line: this.line
    }

    this.lastProduct = await this.api.getLast(line)
    this.count = await this.api.getToday(line)
    this.byModel = await this.api.getTodayByModels(line)
    this.rest = await this.api.getSectorBalance(line)
  }

  async requestSerial(id: number) {
    let data = {
      id: Number(id)
    }
    let result = await this.api.VakumSerial(data)
    console.log(result)
    if(result.result != 'ok'){
      this.someError = true
      this.added = false
      this.errorText = `${result.error}`
    }else{
      this.someError = false
      this.errorText = ''
    }
    let line = {
      line: this.line
    }

    this.lastProduct = await this.api.getLast(line)
    // console.log(this.lastProduct)
    this.count = await this.api.getToday(line)
    // console.log(this.count)
    this.byModel = await this.api.getTodayByModels(line)
    // console.log("bymodel: ",this.byModel)
    this.rest = await this.api.getSectorBalance(line)
    // console.log("rest: ", this.rest)

    this.renderer.selectRootElement('#serial').focus()
  }

  change(){
    if(this.serial.includes('clear'))
    this.serial = ''
    if(this.serial.includes('refresh')){
      location.reload()
    }
    if(this.serial.length === 13){
      this.sendSerial = this.serial
      this.serial = ''
      this.submit()
    }
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



}
