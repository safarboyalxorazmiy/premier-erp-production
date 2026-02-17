import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { ProductionService } from '../../services/production.service'
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: [
    "./plan.component.css",
    "../../../../node_modules/material-icons/iconfont/material-icons.css"
]
})
export class PlanComponent implements OnInit {
  
  time = new Date();
  intervalId: any;
  accAss: String = ""

  email: string = '';
  password: string = '';
  isLoggedIn: boolean = false;

  accountantToken:any = "";
  accountantName:any = "";

  searchFilter: string;

  models: any = [
    {name: "PRM-211"}, 
    {name: "PRM-261"}, 
    {name: "PRM-315"}, 
    {name: "PRM-317"}
  ];
  selectedModel: any;

  innerModels: any;
  selectedInnerModel: any = null;

  plan: any;

  isCreated:any = false;
  isDeleted:any = false;
  isUpdated:any = false;

  plans: any;
  createModalIsVisible:boolean = false;
  updateModalIsVisible:boolean = false;

  selectedUpdatableModel: any;

  constructor(
    public api: ProductionService, 
    public renderer: Renderer2, 
    private titleService: Title
  ) {}

  ngAfterViewInit() {
    if (localStorage.getItem("accountant_token") != null) {
      this.isLoggedIn = true;
      this.accountantToken = localStorage.getItem("accountant_token");
      this.accountantName = localStorage.getItem("accountant_name");
      
      this.getPlans();
    }
  }

  async closeCreateModal() {
    this.createModalIsVisible = false;
  }

  async showCreateModal() {
    this.createModalIsVisible = true;
  }

  async getPlans() {
    this.plans = await this.api.getPlans(this.accountantToken);

    console.log(this.plans)
  }

  async ngOnInit(): Promise<void> {
    this.titleService.setTitle("Plan - Bosh sahifa");

  }
  
  async submit() {
    let data = {
      email: this.email,
      password: this.password
    }

    let result = await this.api.LogistLogin(data);

    if (result != null) {

      if (result.role == 'ACCOUNTANT') {
        localStorage.setItem("accountant_token", result.access_token);
        localStorage.setItem("accountant_name", 
          result.firstName + " " + result.lastName
        );

        window.location.reload();
      }
    }
  }

  logout() {
    localStorage.clear();
    window.location.reload();
  }

  async selectModel(event: any) {
    console.log('Selected Item:', this.selectedModel);

    this.innerModels = await this.api.getModelByName(this.accountantToken, this.selectedModel.name);
    console.log(this.innerModels)
  }

  async createPlan() {
    let result = await this.api.createPlan(this.accountantToken, this.selectedInnerModel.id, this.plan);
    console.log(result)

    this.isCreated = true;

    setTimeout(() => {
      this.isCreated = false;
    }, 2000);

    this.selectedModel = null;
    this.selectedInnerModel = null;
    this.plan = null;
    this.closeCreateModal();
    this.getPlans();
  }

  async deletePlan(plan:any) {
    await this.api.deletePlan(this.accountantToken, plan.modelId, plan.plan);
    
    this.getPlans();

    this.isDeleted = true;

    setTimeout(() => {
      this.isDeleted = false;
    }, 2000);
  }

  closeUpdateModal() {
    this.updateModalIsVisible = false;
  }

  showUpdateModal(plan: any) {
    console.log(plan)
    this.selectedUpdatableModel = plan;
    this.updateModalIsVisible = true;
    this.plan = plan.plan;
  }

  async updatePlan() {
    let result = 
      await this.api.updatePlan(
        this.accountantToken, this.selectedUpdatableModel.modelId, this.plan
      );
    if (result) {
      this.closeUpdateModal();

      this.getPlans();

      this.isUpdated = true;

      setTimeout(() => {
        this.isUpdated = false;
      }, 2000);
    }
  }

}