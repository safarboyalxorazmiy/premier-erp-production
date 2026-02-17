import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { ProductionService } from '../../services/production.service'
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-packing',
  templateUrl: './logist.component.html',
  styleUrls: ['./logist.component.css']
})
export class LogistComponent implements OnInit {

  modal:boolean = false;

  time = new Date();
  intervalId: any;
  accAss: String = "";

  email: string = '';
  password: string = '';
  isLoggedIn: boolean = false;
  notVerifiedComponents: any = [];
  verifiedComponents: any = [];
  logistToken: any = "";
  isCreated:any = false;
  masters:any = [];

  selectedMaster: any;
  selectedComponent: any;
  quantity: any;
  isGiven: boolean;
  menuOpened:boolean = false;
  logistName:any = "";

  quantityError:any = "";
  componentError:any = "";
  masterError:any = "";

  constructor(
    public api: ProductionService, 
    public renderer: Renderer2,
    private titleService: Title
  ) {}

  ngAfterViewInit() {
    if (localStorage.getItem("logist_token") != null) {
      this.isLoggedIn = true;
      this.logistToken = localStorage.getItem("logist_token");
      this.logistName = localStorage.getItem("logist_name");

      this.getVerifiedComponents();
    }

    this.getMasters();
  }

  async ngOnInit(): Promise<void> {
    this.titleService.setTitle("Logist - Bosh sahifa");

    this.intervalId = setInterval(() => {
      this.time = new Date();
    }, 1000);

    setInterval(() => {
      if (localStorage.getItem("logist_token") != null) {
        this.getNotVerifiedComponents();
      }
    }, 1000)
  }

  async getMasters() {
    this.masters = await this.api.getMasters();
  }
  
  async getNotVerifiedComponents() {
    this.notVerifiedComponents = await this.api.getNotVerifiedComponents(this.logistToken);
  }

  async getVerifiedComponents() {
    this.verifiedComponents = await this.api.getVerifiedComponents(this.logistToken);
  }

  async acceptRequest(requestId: number) {
    await this.api.verifyRequest(this.accAss, requestId)
    this.isCreated = true;

    setTimeout(() => {
      this.isCreated = false;
    }, 2000);

  }

  async cancelRequest(requestId: number) {
    await this.api.cancelRequest(this.accAss, requestId)
  }
  
  async submit() {
    let data = {
      email: this.email,
      password: this.password
    }

    let result = await this.api.LogistLogin(data);

    if (result != null) {
      if (result.role == 'LOGIST') {
        localStorage.setItem("logist_token", result.access_token)
        localStorage.setItem("logist_name", result.firstName + " " + result.lastName);
        window.location.reload();
      }
    }
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
  
      let result = await this.api.submitComponent(this.logistToken, data);
  
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
  
  async searchVerifiedComponents(event: any) {
    console.log(event.target.value);

    this.verifiedComponents = await this.api.searchVerifiedComponents(this.logistToken, event.target.value);
  }
  
  toggleMenu() {
    if (this.menuOpened == true) {
      this.menuOpened = false;
    } else {
      this.menuOpened = true;
    }
  }

  closeMenu() {
    if (this.menuOpened == true) {
      this.menuOpened = false;
    }
  }
}
