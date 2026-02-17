import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { ProductionService } from '../../services/production.service'
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-packing',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit {
  
  time = new Date();
  intervalId: any;
  accAss: String = ""

  email: string = '';
  password: string = '';
  isLoggedIn: boolean = false;
  notVerifiedComponents: any = [];

  verifiedComponents: any = [];
  composites: any = [];

  masterToken: any = "";
  isCreated:any = false;
  menuOpened:boolean = false;
  lineMenu:boolean = false;
  linesInfo:any = [];
  line: any = {};
  masterName:any = "";

  modal:boolean = false;
  selectedMaster: any;
  selectedComponent: any;
  quantity: any;
  isGiven: boolean;
  quantityError:any = "";
  componentError:any = "";
  masterError:any = "";
  masters:any = [];

  searchFilter: string;

  isCompositeCreatable: boolean = false;
  productionModalIsVisible:boolean = false;

  constructor(
    public api: ProductionService, 
    public renderer: Renderer2, 
    private titleService: Title
  ) {}

  ngAfterViewInit() {
    if (localStorage.getItem("master_token") != null) {
      this.isLoggedIn = true;
      this.masterToken = localStorage.getItem("master_token");
      this.masterName = localStorage.getItem("master_name");
    }

    this.getVerifiedComponents();
    this.getComposites();
    this.getLineInfo();
  }

  async getLineInfo() {
    let info:any = await this.api.getMasterLineInfo(this.masterToken);
    this.isCompositeCreatable = info.isCompositeCreatable;
  }

  async ngOnInit(): Promise<void> {
    this.titleService.setTitle("Master - Bosh sahifa");
    this.getMasters();

    this.intervalId = setInterval(() => {
      this.time = new Date();
    }, 1000);
    
    this.linesInfo = await this.api.getAllLines();

    setInterval(() => {
      if (localStorage.getItem("master_token") != null) {
        this.getNotVerifiedComponents();
        this.getMasterLine();
      }
    }, 1000)
  }

  async getMasters() {
    this.masters = await this.api.getMasters();
  }

  async getMasterLine() {
    this.line = await this.api.getMasterLine(this.masterToken);
  }

  async getNotVerifiedComponents() {
    this.notVerifiedComponents = await this.api.getNotVerifiedComponentsMaster(this.masterToken);
  }

  async getVerifiedComponents() {
    this.verifiedComponents = await this.api.getVerifiedComponentsMaster(this.masterToken);
  }

  async getComposites() {
    this.composites = await this.api.getLineCompositesMaster(this.masterToken);
  }

  async acceptRequest(requestId: number) {
    await this.api.verifyRequestMaster(this.accAss, requestId)
    this.getVerifiedComponents();
    this.getComposites();
    this.isCreated = true;

    setTimeout(() => {
      this.isCreated = false;
    }, 2000);
  }

  async cancelRequest(requestId: number) {
    await this.api.cancelRequestMaster(this.accAss, requestId);
    this.getVerifiedComponents();
    this.getComposites();
  }
  
  async submit() {
    let data = {
      email: this.email,
      password: this.password
    }

    let result = await this.api.LogistLogin(data);

    if (result != null) {

      if (result.role == 'MASTER') {
        localStorage.setItem("master_token", result.access_token);
        localStorage.setItem("master_name", result.firstName + " " + result.lastName);
        window.location.reload();
      }
    }
  }

  logout() {
    localStorage.clear();
    window.location.reload();
  }
  
  toggleMenu() {
    if (this.menuOpened == true) {
      this.menuOpened = false;
    } else {
      this.menuOpened = true;
    }
  }

  toggleLineMenu() {
    if (this.lineMenu == true) {
      this.lineMenu = false;
    } else {
      this.lineMenu = true;
    }
  }

  closeMenu() {
    if (this.menuOpened == true) {
      this.menuOpened = false;
    }
    
    if (this.lineMenu == true) {
      this.lineMenu = false;
    }
  }

  async setLine(line:any) {
    this.line = line;
    
    await this.api.setMasterLine(localStorage.getItem("master_token"),  line.id);
    this.getVerifiedComponents();
    this.getComposites();
  }

  async searchVerifiedComponents(event: any) {
    console.log(event.target.value);

    this.verifiedComponents = await this.api.searchVerifiedMasterComponents(this.masterToken, event.target.value);
  }

  showModal() {
    this.modal = true;
  }

  closeModal() {
    this.modal = false;
  }

  async submitComponent() {
    if (this.selectedMaster == undefined || this.selectedMaster == null) {
      this.masterError = "Master tanlanmadi!";
    } else {
      this.masterError = "";
    }

    if (this.selectedComponent == undefined || this.selectedComponent == null) {
      this.componentError = "Detall tanlanmadi!";
    } else {
      this.componentError = "";
    }

    if (this.quantity == undefined || this.quantity == null) {
      this.quantityError = "Qiymat kiritilmadi!";
      return;
    } else {
      this.quantityError = "";
    }
    
    try {
      let data = {
        componentId: this.selectedComponent.componentId,
        masterId: this.selectedMaster.id,
        quantity: this.quantity
      }
      console.log(data)
  
      let result = await this.api.submitComponentFromMaster(this.masterToken, data);
  
      if (result) {
        this.modal = false;
        this.isGiven = true;
  
        setTimeout(() => {
          this.isGiven = false;
        }, 2000);
  
        // Reload only if the submission was successful
        location.reload();
      }
    } catch (error:any) {
      this.quantityError = error.error;
    }
  }

  showProductionModal() {
    this.productionModalIsVisible = true;
  }

  closeProductionModal() {
    this.productionModalIsVisible = false;
  }
}