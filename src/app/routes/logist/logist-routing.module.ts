import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogistComponent } from './logist.component';

const routes: Routes = [{ path: '', component: LogistComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PackingRoutingModule { }
