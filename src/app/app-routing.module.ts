import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaticChartsComponent } from './charts/static-charts/static-charts.component';
import { ClientinstanceOverviewComponent } from './clientinstance/clientinstance-overview/clientinstance-overview.component';
import { DetectorOverviewComponent } from './detectors/detector-overview/detector-overview.component';
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
  },
  {
    path: 'clientInstances/:clientInstanceId/detectors',
    component: DetectorOverviewComponent
  },
  {
    path: 'staticDataAnalyzer',
    component: StaticChartsComponent
  }
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
