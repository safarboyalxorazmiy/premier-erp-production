import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MetallRoutingModule } from './metall-routing.module';
import { MetallComponent } from './metall.component';

import { FormsModule } from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';


@NgModule({
  declarations: [
    MetallComponent
  ],
  imports: [
    CommonModule,
    MetallRoutingModule,
    ButtonModule,
    FormsModule,
    ToolbarModule,
    TableModule,
    InputTextModule
  ]
})
export class MetallModule { }
