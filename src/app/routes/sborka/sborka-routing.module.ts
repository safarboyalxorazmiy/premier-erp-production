import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SborkaComponent } from './sborka.component';

const routes: Routes = [{ path: '', component: SborkaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SborkaRoutingModule { }
