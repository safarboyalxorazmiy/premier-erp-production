import { Component, OnInit } from '@angular/core';
import { ProductionService } from 'src/app/services/production.service';

@Component({
  selector: 'app-doors',
  templateUrl: './doors.component.html',
  styleUrls: ['./doors.component.css']
})
export class DoorsComponent implements OnInit {

  constructor(public api: ProductionService) { }

  plan: any
  errorText: any

  // stop spam metal form wait 1.5s
  clicked = false

  added: boolean = false
  addedText: string = "Kiritildi"
  someError: boolean = false

  reprintDialogVisible: boolean = false
  reprintDays: any[] = []
  reprintLoading: boolean = false
  reprintClicked: boolean = false
  selectedReprintGroup: string = ''
  reprintSearchRef: string = ''

  ngOnInit(): void  {
    this.getPlan()
  }

  async getPlan(){
    let result = await this.api.BackendRequest("", "/production/doors/plan/list")
    console.log(result)
    if (result.result === "ok"){
      this.plan = result.data
    }
  }

  async getLabel(product: any){
    // console.log(product)
    let result  = await this.api.BackendRequest({
      id: product.model_id
    }, "/production/doors/print")
    if (result.result == "ok"){
        
    }else{
      this.errorText = result.error
    }
    this.getPlan()

   // stop spam metal form wait 1.5s
    this.clicked = true;
    setTimeout(()=>{
      this.clicked = false;
    }, 500)

  }

  async openReprintDialog() {
    this.reprintDialogVisible = true
    this.reprintLoading = true
    this.selectedReprintGroup = ''
    this.reprintDays = []
    this.reprintSearchRef = ''
    let result = await this.api.getDoorsTodayPrinted()
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

  async reprintSerial(item: any) {
    this.reprintClicked = true
    let result = await this.api.doorsReprintSerial({
      ref_serial: item.ref_serial
    })
    if (result.result !== 'ok') {
      this.someError = true
      this.added = false
      this.errorText = `${result.error}`
    } else {
      this.someError = false
      this.errorText = ''
      this.added = true
      this.addedText = 'Qayta chiqarildi'
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
    if (!this.reprintSearchRef || this.reprintSearchRef.trim() === '') return
    this.reprintClicked = true
    let result = await this.api.doorsReprintSerial({
      ref_serial: this.reprintSearchRef.trim()
    })
    if (result.result !== 'ok') {
      this.someError = true
      this.added = false
      this.errorText = `${result.error}`
    } else {
      this.someError = false
      this.errorText = ''
      this.added = true
      this.addedText = 'Qayta chiqarildi'
      this.reprintSearchRef = ''
      setTimeout(() => {
        this.added = false
        this.addedText = 'Kiritildi'
      }, 3000)
    }
    setTimeout(() => {
      this.reprintClicked = false
    }, 3000)
  }
}
