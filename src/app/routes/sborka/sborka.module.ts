import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SborkaRoutingModule } from './sborka-routing.module';
import { SborkaComponent } from './sborka.component';
import {InputTextModule} from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import {ToolbarModule} from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import {ButtonModule} from 'primeng/button';



@NgModule({
  declarations: [
    SborkaComponent
  ],
  imports: [
    CommonModule,
    SborkaRoutingModule,
    InputTextModule,
    FormsModule,
    ToolbarModule,
    TableModule,
    ButtonModule
  ]
})
export class SborkaModule { }
