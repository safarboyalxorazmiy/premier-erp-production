import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoorsRoutingModule } from './doors-routing.module';
import { DoorsComponent } from './doors.component';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';


@NgModule({
  declarations: [
    DoorsComponent
  ],
  imports: [
    CommonModule,
    DoorsRoutingModule,
    FormsModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule
  ]
})
export class DoorsModule { }
