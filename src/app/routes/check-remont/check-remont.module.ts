import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckRemontRoutingModule } from './check-remont-routing.module';
import { CheckRemontComponent } from './check-remont.component';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';


@NgModule({
  declarations: [
    CheckRemontComponent
  ],
  imports: [
    CommonModule,
    CheckRemontRoutingModule,
    FormsModule, 
    InputTextModule
  ]
})
export class CheckRemontModule { }
