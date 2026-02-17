import { Component, OnInit } from '@angular/core';
import {IRemontTypes, ILines} from 'src/app/models/production'
import {ProductionService} from 'src/app/services/production.service'
import {MessageService} from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  remontTypesAll: IRemontTypes[]
  currentType: IRemontTypes
  lines: ILines[];
  selectedLine: ILines
  someError: boolean = false
  errorText: any
  defName: string = ''

  constructor(public api: ProductionService, private messageService: MessageService, public confirmationService: ConfirmationService) { }

  async ngOnInit(): Promise<void> {
    this.remontTypesAll = await this.api.getDefectsTypes()
    this.lines = await this.api.getLines()   
  }

  deleteDefect(product: IRemontTypes) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.name + ': ' + product.defect_name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        // console.log("delete: ", product)
        let data = {
          id: product.id
        }
          let result = await this.api.deleteDefectsTypes(data)
          console.log("result: ",result)

          if(result.result != 'ok'){
            this.someError = true
            this.errorText = result.error
            return

          }else{
            this.someError = false
          }
          this.messageService.add({severity:'success', summary: 'Success', detail:"Defekt o'chirildi"});
          this.remontTypesAll = await this.api.getDefectsTypes()
          // alert('ERROR')
          // // location.reload();
          // this.loading = true
          // this.components = await this.api.getComponentsAll(this.token)
          // this.loading = false
      }
  });
    // this.clonedProducts[product.id] = {...product};
  }
  async defKiritish(){
    console.log("def name: ", this.defName)
    if (this.defName == ''){
      this.someError = true
      this.errorText = "Defekt nomi kiritilmadi"
      return
    }
    this.someError = false
    let data = {
      line: this.selectedLine.id,
      name: this.defName
    }
    // console.log(this.selectedLine, this.defName)
    let result = await this.api.addDefectsTypes(data)
    if (result.result == 'ok'){
      this.messageService.add({severity:'success', summary: 'Success', detail:'Defekt turi kiritildi'});
    }else{
      this.someError = true
      this.errorText = result.error
    }
    this.remontTypesAll = await this.api.getDefectsTypes()
    this.defName = ''
  }
 
}
