import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LaboratoryRoutingModule } from './laboratory-routing.module';
import { LaboratoryComponent } from './laboratory.component';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';


@NgModule({
  declarations: [
    LaboratoryComponent
  ],
  imports: [
    CommonModule,
    LaboratoryRoutingModule,
    FormsModule,
    ToolbarModule,
    TableModule,
    InputTextModule
  ]
})
export class LaboratoryModule { }
