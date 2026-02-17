import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RemontComponent } from './remont.component';

const routes: Routes = [{ path: '', component: RemontComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RemontRoutingModule { }
