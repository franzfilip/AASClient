import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientinstanceOverviewComponent } from './clientinstance/clientinstance-overview/clientinstance-overview.component';
import { MeasurementlogOverviewComponent } from './measurementlog/measurementlog-overview/measurementlog-overview.component';
import { SimulationComponent } from './simulation/simulation.component';

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
   component: ClientinstanceOverviewComponent
  },
  {
    path: 'measurementlogs',
    component: MeasurementlogOverviewComponent
  },
  {
    path: 'clientInstances/simulation/:clientInstanceId',
    component: SimulationComponent
  }
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
