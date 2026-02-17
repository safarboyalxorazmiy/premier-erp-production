import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MetallComponent } from './metall.component';

const routes: Routes = [{ path: '', component: MetallComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MetallRoutingModule { }
