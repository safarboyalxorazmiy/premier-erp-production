import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductionService } from 'src/app/services/production.service'
import { IProduction } from 'src/app/models/production'
import { IMetal } from 'src/app/models/metal'
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-metals',
  templateUrl: './metals.component.html',
  styleUrls: ['./metals.component.css']
})

export class MetalsComponent implements OnInit {

  plan: any
  lastProduct: IProduction[]
  models: any
  count: any
  byModel: any
  metalToday: IMetal[]


  time = new Date();
  intervalId: any;
  line: number = 9
  serial: String = ''
  sendSerial: String

  rest: any

  // stop spam metal form wait 1.5s
  clicked = false

  added: boolean = false
  addedText: string = "Kiritildi"

  someError: boolean = false
  errorText: string = '';

  id: any;
  selectedModel: any;
  selectedType: any;

  otherData: any

  reprintDialogVisible: boolean = false
  reprintDays: any[] = []
  reprintLoading: boolean = false
  reprintClicked: boolean = false
  selectedReprintGroup: string = ''
  reprintSearchSerial: string = ''
  reprintHistory: any[] = []

  constructor(private route: ActivatedRoute, public api: ProductionService, public renderer: Renderer2) { }

  async ngOnInit(): Promise<void> {
    this.id = this.route.snapshot.paramMap.get('model_id');
    console.log(this)
    this.models = await this.api.getModels()
    for(let i of this.models){
      if(i.id == this.id) {
        this.selectedModel = i.name + " " + i.comment
      }
    }
    // console.log()

    let line = {
      line: this.line
    }
    this.otherData = await this.api.BackendRequest("", "/production/plan/info")
    // console.log("this.otherData: ", this.otherData)
    this.lastProduct = await this.api.getLast(line)
    // console.log(this.lastProduct)
    this.count = await this.api.getToday(line)
    // console.log(this.count)
    this.byModel = await this.api.getTodayByModels(line)
    // console.log("bymodel: ",this.byModel)
    this.rest = await this.api.getSectorBalance(line)
    
    this.getPlan()
    this.loadReprintHistory()

  }
  
  async requestSerial(item:any) {

    // stop spam metal form wait 1.5s
    this.clicked = true;
    setTimeout(()=>{
      this.clicked = false;
    }, 3000)

    let data = {
      id: item.id
    }
    console.log(item)
    let result = await this.api.MetallSerial(data)
    console.log("result: ", result)
    if(result.result != 'ok'){
      this.someError = true
      this.added = false
      this.errorText = `${result.error}`
    }else{
      this.someError = false
      this.errorText = ''
    }
    this.getPlan()
  }

  // ngOnInit(): void  {
  //   this.getPlan()
  // }

  async getPlan(){
    let result = await this.api.BackendRequest("", "/production/metals/plan/list")
    console.log(result)
    if (result.result === "ok"){
      this.plan = result.data
    }
  }

  async getLabel(product: any){
    // console.log(product)
    let result  = await this.api.BackendRequest({
      id: product.model_id
    }, "/production/metall/serial")
    if (result.result == "ok"){
        
    }else{
      this.errorText = result.error
    }
    this.getPlan()
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

  async openReprintDialog() {
    this.reprintDialogVisible = true
    this.reprintLoading = true
    this.selectedReprintGroup = ''
    this.reprintDays = []
    this.reprintSearchSerial = ''
    let historyResult = await this.api.getMetalsReprintHistory()
    if (historyResult.result === 'ok') {
      this.reprintHistory = historyResult.data || []
    }
    let result = await this.api.getMetalsTodayPrinted()
    if (result.result === 'ok') {
      let items = result.data || []
      let todayStr = this.formatDateDDMMYYYY(new Date())
      let byDate: any = {}
      for (let item of items) {
        let dateKey = item.date || todayStr
        if (!byDate[dateKey]) {
          byDate[dateKey] = {}
        }
        if (!byDate[dateKey][item.model]) {
          byDate[dateKey][item.model] = []
        }
        byDate[dateKey][item.model].push(item)
      }
      this.reprintDays = Object.keys(byDate).map(date => ({
        date: date,
        label: date === todayStr ? 'Bugun' : this.formatDateLabel(date),
        groups: Object.keys(byDate[date]).map(model => ({
          model: model,
          key: date + '|' + model,
          count: byDate[date][model].length,
          serials: byDate[date][model].slice(0, 50)
        }))
      }))
    } else {
      this.reprintDays = []
      this.someError = true
      this.errorText = result.error
    }
    this.reprintLoading = false
  }

  formatDateDDMMYYYY(d: Date): string {
    let dd = String(d.getDate()).padStart(2, '0')
    let mm = String(d.getMonth() + 1).padStart(2, '0')
    let yyyy = d.getFullYear()
    return dd + '.' + mm + '.' + yyyy
  }

  formatDateLabel(dateStr: string): string {
    let parts = dateStr.split('.')
    if (parts.length !== 3) return dateStr
    let months: any = {'01':'Yanvar','02':'Fevral','03':'Mart','04':'Aprel','05':'May','06':'Iyun','07':'Iyul','08':'Avgust','09':'Sentabr','10':'Oktabr','11':'Noyabr','12':'Dekabr'}
    return parts[0] + ' ' + (months[parts[1]] || parts[1])
  }

  selectReprintGroup(key: string) {
    this.selectedReprintGroup = this.selectedReprintGroup === key ? '' : key
  }

  getSelectedSerials(): any[] {
    for (let day of this.reprintDays) {
      let group = day.groups.find((g: any) => g.key === this.selectedReprintGroup)
      if (group) return group.serials
    }
    return []
  }

  async reprintSerial(serial: string) {
    this.reprintClicked = true
    let result = await this.api.metalsReprintSerial({ serial: serial })
    if (result.result !== 'ok') {
      this.someError = true
      this.added = false
      this.errorText = `${result.error}`
    } else {
      this.someError = false
      this.errorText = ''
      this.added = true
      this.addedText = 'Qayta chiqarildi'
      this.loadReprintHistory()
      setTimeout(() => {
        this.added = false
        this.addedText = 'Kiritildi'
      }, 3000)
    }
    setTimeout(() => {
      this.reprintClicked = false
    }, 3000)
  }

  async reprintBySerial() {
    if (!this.reprintSearchSerial || this.reprintSearchSerial.trim() === '') return
    this.reprintClicked = true
    let result = await this.api.metalsReprintSerial({ serial: this.reprintSearchSerial.trim() })
    if (result.result !== 'ok') {
      this.someError = true
      this.added = false
      this.errorText = `${result.error}`
    } else {
      this.someError = false
      this.errorText = ''
      this.added = true
      this.addedText = 'Qayta chiqarildi'
      this.reprintSearchSerial = ''
      this.loadReprintHistory()
      setTimeout(() => {
        this.added = false
        this.addedText = 'Kiritildi'
      }, 3000)
    }
    setTimeout(() => {
      this.reprintClicked = false
    }, 3000)
  }

  async loadReprintHistory() {
    let res = await this.api.getMetalsReprintHistory()
    if (res.result === 'ok') {
      this.reprintHistory = res.data || []
    }
  }

  async exportExcel() {
    this.metalToday = await this.api.getMetalTodaySerial()
      import("xlsx").then(xlsx => {
          const worksheet = xlsx.utils.json_to_sheet(this.metalToday);
          const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
          const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
          this.saveAsExcelFile(excelBuffer, "metal");
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
