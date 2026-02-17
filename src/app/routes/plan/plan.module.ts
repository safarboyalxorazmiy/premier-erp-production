import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanComponent } from './plan.component';
import { ToolbarModule } from 'primeng/toolbar';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ImageModule } from 'primeng/image';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { PlanRoutingModule } from './plan-routing.module'; 

@NgModule({
  declarations: [
    PlanComponent
  ],
  imports: [
    CommonModule,
    PlanRoutingModule, 
    InputTextModule,
    FormsModule,
    ToolbarModule,
    TableModule,
    ButtonModule,
    InputSwitchModule,
    ImageModule,
    DropdownModule,
    InputNumberModule
  ]
})
export class PlanModule { }
