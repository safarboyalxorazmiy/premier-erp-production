import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RemontRoutingModule } from './remont-routing.module';
import { RemontComponent } from './remont.component';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { ZXingScannerModule } from '@zxing/ngx-scanner';






@NgModule({
  declarations: [
    RemontComponent
  ],
  imports: [
    CommonModule,
    RemontRoutingModule,
    TableModule,
    ToastModule,
    DialogModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    ConfirmDialogModule,
    FormsModule,
    ReactiveFormsModule,
    ZXingScannerModule
  ]
})
export class RemontModule { }
