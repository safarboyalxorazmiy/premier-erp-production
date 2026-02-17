import { Component, OnInit } from '@angular/core';
import { ProductionService } from '../../../services/production.service'

interface Line {
  name: string,
  code: number
}

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})


export class IncomeComponent implements OnInit {

  lines: Line[];
  selectedLine: Line;


  serial: string = ""
  balance: any
  line: number = 2
  loaded: boolean = false

  someError: boolean = false
  errorText: string = ""

  added: boolean = false
  addedText: string = ""

  sendSerial: string = ""

  constructor(public api: ProductionService) {
    this.lines = [
      {name: 'Metall formovka', code: 9},
      {name: 'Vakum formovka', code: 1}
  ];
   }

  async ngOnInit(): Promise<void> {

    this.balance = await this.api.getSectorBalanceGP({
      line: this.line
    })
    if (this.balance.result != "ok"){
      this.loaded = false
      this.someError = true
      this.errorText = "server error"
      return
    }
    this.loaded = true
    console.log(this.balance)


  }

  async change(){
    if(this.serial.includes('refresh')){
      location.reload()
    }
    if(this.serial.length === 13){
      this.sendSerial = this.serial
      this.serial = ""
      let data = {
        line: this.line,
        checkpoint_id: this.selectedLine.code,
        serial: this.sendSerial
      }
      console.log(data)
      let result = await this.api.Logistics(data)
      console.log(result)
      if (result.result == "error"){
        this.added = false
        this.someError = true
        this.errorText = result.error
        this.serial = ""
        return
      }
      this.someError = false
      this.added = true
      this.addedText = "kiritildi"
      this.balance = await this.api.getSectorBalanceGP({
        line: this.line
      })

      setTimeout(()=>{
        this.added = false
      }, 3000)

      
    }
    if (this.serial.length > 13) {
      this.serial = ""
    }

  }

}
