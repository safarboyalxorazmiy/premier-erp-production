import { Component, OnInit } from '@angular/core';
import { ProductionService } from 'src/app/services/production.service';

@Component({
  selector: 'app-check-remont',
  templateUrl: './check-remont.component.html',
  styleUrls: ['./check-remont.component.css']
})
export class CheckRemontComponent implements OnInit {

  serial: string = ""
  added: boolean = false
  addedText: string = "Tekshirildi, OK"

  someError: boolean = false
  errorText: string = '';
  sendSerial = ""
  result: any

  constructor(public api: ProductionService) { }

  ngOnInit(): void {
  }

  async submit(){
    let data = {
      serial: this.sendSerial,
    }

    this.result = await this.api.CheckRemont(data)
    this.serial = ''
    console.log("result: ", this.result)
    if (this.result.result != "ok") {
      this.someError = true
      return
    }
    this.someError = false
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
    if(this.serial.length === 13){
      this.sendSerial = this.serial
      this.serial = ''
      this.submit()
    }
  }

}
