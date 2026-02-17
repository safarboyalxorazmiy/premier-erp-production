import { Component, OnInit, Renderer2 } from '@angular/core';
import { IProduction } from 'src/app/models/production';
import { ProductionService } from '../../services/production.service'


@Component({
  selector: 'app-metall',
  templateUrl: './metall.component.html',
  styleUrls: ['./metall.component.css']
})
export class MetallComponent implements OnInit {

  constructor(public api: ProductionService, public renderer: Renderer2) { }

  lastProduct: IProduction[]
  models: any
  count: any
  byModel: any
  time = new Date();
  intervalId: any;
  line: number = 9
  serial: String = ''
  sendSerial: String

  rest: any

  added: boolean = false
  addedText: string = "Kiritildi"

  someError: boolean = false
  errorText: string = '';

  modelList: any = [
    {
      name: "211",
      code: "A"
    },
    {
      name: "215",
      code: "M"
    },
    {
      name: "261",
      code: "B"
    },
    {
      name: "270",
      code: "N"
    },
    {
      name: "315",
      code: "C"
    },  
  
    {
      name: "317",
      code: "D"
    },
    {
      name: "320",
      code: "O"
    },
    {
      name: "330",
      code: "P"
    },


    {
      name: "222",
      code: "G"
    },
    {
      name: "250",
      code: "S"
    },
    {
      name: "350",
      code: "L"
    },

]

  selectedType: boolean = false;
  type: String = "";
  selectedModel: boolean = false;
  modelArray: any[] = [];


  model: String = '';

  selectedColor: boolean = false;

  async ngOnInit(): Promise<void> {

    this.intervalId = setInterval(() => {
      this.time = new Date();
    }, 1000);

    this.models = await this.api.getModels()
    let line = {
      line: this.line
    }

    console.log(this.models)

    // this.lastProduct = await this.api.getLast(line)
    // console.log(this.lastProduct)
    // this.count = await this.api.getToday(line)
    // console.log(this.count)
    // this.byModel = await this.api.getTodayByModels(line)
    // console.log("bymodel: ",this.byModel)
    // this.rest = await this.api.getSectorBalance(line)
    // console.log("rest: ", this.rest)

    // console.log(this.models)
  }


  change(){
    if(this.serial.includes('clear'))
    this.serial = ''
    if(this.serial.includes('refresh')){
      location.reload()
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
      // this.renderer.selectRootElement('#serial').focus()
      this.added = true
      setTimeout(()=>{
        this.added = false
      }, 3000)

  }

  selectType(type:String) {
    this.selectedType = true;
    this.type = type;
  }

  selectModel(model: any) {
    this.selectedModel = true;
    for (const iterator of this.models) {

      if (iterator.name.includes(model.name))
      this.modelArray.push(iterator);
      // console.log(iterator.code[2], this.type , iterator.code[3] , model)
      // if (iterator.code[2] == this.type && iterator.code[3] == model){
      //   this.modelArray.push(iterator);
      // }
        
    }

    console.log(this.modelArray)
  }

  setModel(model:String) {
    this.model = model
  }
}
