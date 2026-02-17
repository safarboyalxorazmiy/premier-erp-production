import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PackingComponent } from './packing.component';

const routes: Routes = [{ path: '', component: PackingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PackingRoutingModule { }
