import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VakumRoutingModule } from './vakum-routing.module';
import { VakumComponent } from './vakum.component';


import {ButtonModule} from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';

@NgModule({
  declarations: [
    VakumComponent
  ],
  imports: [
    CommonModule,
    VakumRoutingModule,
    ButtonModule,
    FormsModule,
    ToolbarModule,
    TableModule,
    InputTextModule
  ]
})
export class VakumModule { }
