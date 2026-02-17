import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoorsComponent } from './doors.component';

const routes: Routes = [{ path: '', component: DoorsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoorsRoutingModule { }
