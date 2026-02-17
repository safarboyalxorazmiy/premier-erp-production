import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterComponent } from './master.component';
import { ToolbarModule } from 'primeng/toolbar';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ImageModule } from 'primeng/image';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { MasterRoutingModule } from './master-routing.module'; 

@NgModule({
  declarations: [
    MasterComponent
  ],
  imports: [
    CommonModule,
    MasterRoutingModule, 
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
export class MasterModule { }
