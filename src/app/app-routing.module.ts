import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeasurementlogOverviewComponent } from './measurementlog/measurementlog-overview/measurementlog-overview.component';

const routes: Routes = [
  {
   path: '',
   redirectTo: 'clientinstances',
   pathMatch: 'full'
  },
  {
    path: 'index.html',
    redirectTo: 'clientinstances',
    pathMatch: 'full'
  },
  {
   path: 'clientinstances',
   component: MeasurementlogOverviewComponent
  },
  {
    path: 'measurementlogs',
    component: MeasurementlogOverviewComponent
   }
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
