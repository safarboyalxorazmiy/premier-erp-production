import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PackingRoutingModule } from './packing-routing.module';
import { PackingComponent } from './packing.component';
import { ToolbarModule } from 'primeng/toolbar';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {InputSwitchModule} from 'primeng/inputswitch';
import { ImageModule } from 'primeng/image';
import { RadioButtonModule } from 'primeng/radiobutton';


@NgModule({
  declarations: [
    PackingComponent
  ],
  imports: [
    CommonModule,
    PackingRoutingModule,
    InputTextModule,
    FormsModule,
    ToolbarModule,
    TableModule,
    ButtonModule,
    InputSwitchModule,
    ImageModule,
    RadioButtonModule
  ]
})
export class PackingModule { }
