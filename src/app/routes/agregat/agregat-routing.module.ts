import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregatComponent } from './agregat.component';

const routes: Routes = [{ path: '', component: AgregatComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgregatRoutingModule { }
