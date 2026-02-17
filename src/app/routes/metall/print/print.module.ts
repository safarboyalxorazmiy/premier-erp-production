import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrintRoutingModule } from './print-routing.module';
import { PrintComponent } from './print.component';

import { FormsModule } from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';


@NgModule({
  declarations: [
    PrintComponent
  ],
  imports: [
    CommonModule,
    PrintRoutingModule,
    ButtonModule,
    FormsModule,
    ToolbarModule,
    TableModule,
    ButtonModule,
    InputTextModule
  ]
})
export class PrintModule { }