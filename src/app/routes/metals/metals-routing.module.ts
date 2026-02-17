import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MetalsComponent } from './metals.component';

const routes: Routes = [{ path: '', component: MetalsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MetalsRoutingModule { }
