import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'sborka', loadChildren: () => import('./routes/sborka/sborka.module').then(m => m.SborkaModule) }, 
  { path: 'plan', loadChildren: () => import('./routes/plan/plan.module').then(m => m.PlanModule) }, 
  { path: 'packing', loadChildren: () => import('./routes/packing/packing.module').then(m => m.PackingModule) }, 
  { path: 'remont', loadChildren: () => import('./routes/remont/remont.module').then(m => m.RemontModule) }, 
  { path: 'remont/admin', loadChildren: () => import('./routes/remont/admin/admin.module').then(m => m.AdminModule) }, 
  { path: 'ppu', loadChildren: () => import('./routes/ppu/ppu.module').then(m => m.PpuModule) }, 
  { path: 'remont/repair', loadChildren: () => import('./routes/remont/repair/repair.module').then(m => m.RepairModule) }, 
  { path: 'agregat', loadChildren: () => import('./routes/agregat/agregat.module').then(m => m.AgregatModule) }, 
  { path: 'laboratory', loadChildren: () => import('./routes/laboratory/laboratory.module').then(m => m.LaboratoryModule) }, 
  { path: 'metall', loadChildren: () => import('./routes/metall/metall.module').then(m => m.MetallModule) }, 
  { path: 'logist', loadChildren: () => import('./routes/logist/logist.module').then(m => m.LogistModule) }, 
  { path: 'master', loadChildren: () => import('./routes/master/master.module').then(m => m.MasterModule) }, 
  { path: 'history/exchange', loadChildren: () => import('./routes/history/exchange/exchange.module').then(m => m.ExchangeModule) }, 
  { path: 'sborka/income', loadChildren: () => import('./routes/sborka/income/income.module').then(m => m.IncomeModule) }, 
  { path: 'check_remont', loadChildren: () => import('./routes/check-remont/check-remont.module').then(m => m.CheckRemontModule) }, 
  { path: 'vakum', loadChildren: () => import('./routes/vakum/vakum.module').then(m => m.VakumModule) }, 
  { path: 'report2', loadChildren: () => import('./routes/report2/report2.module').then(m => m.Report2Module) }, 
  { path: 'report', loadChildren: () => import('./routes/report/report.module').then(m => m.ReportModule) },
  { path: 'doors', loadChildren: () => import('./routes/doors/doors.module').then(m => m.DoorsModule) },
  { path: 'metals', loadChildren: () => import('./routes/metals/metals.module').then(m => m.MetalsModule) },
  { path: 'metall/:model_id', loadChildren: () => import('./routes/metall/print/print.module').then(m => m.PrintModule) },
];

  
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
