import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckRemontComponent } from './check-remont.component';

const routes: Routes = [{ path: '', component: CheckRemontComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckRemontRoutingModule { }
