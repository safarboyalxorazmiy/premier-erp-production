import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VakumComponent } from './vakum.component';

const routes: Routes = [{ path: '', component: VakumComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VakumRoutingModule { }
