import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MetalsRoutingModule } from './metals-routing.module';
import { MetalsComponent } from './metals.component';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';


@NgModule({
  declarations: [
    MetalsComponent
  ],
  imports: [
    CommonModule,
    MetalsRoutingModule,
    FormsModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule
  ]
})
export class MetalsModule { }
