import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Report2RoutingModule } from './report2-routing.module';
import { Report2Component } from './report2.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [
    Report2Component
  ],
  imports: [
    CommonModule,
    Report2RoutingModule,
    FormsModule,
    ButtonModule,
    TableModule
  ]
})
export class Report2Module { }
