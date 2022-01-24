import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthentificationGuard } from './authentification.guard';
import { StaticChartsComponent } from './charts/static-charts/static-charts.component';
import { ClientinstanceOverviewComponent } from './clientinstance/clientinstance-overview/clientinstance-overview.component';
import { DetectorOverviewComponent } from './detectors/detector-overview/detector-overview.component';
import { LoginComponent } from './login/login.component';
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
    path: 'index.html',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: "home",
    component: ClientinstanceOverviewComponent,
    canActivate: [AuthentificationGuard]
  },
  {
   path: 'clientinstances',
   component: ClientinstanceOverviewComponent,
   canActivate: [AuthentificationGuard]
  },
  {
    path: 'measurementlogs',
    component: MeasurementlogOverviewComponent,
    canActivate: [AuthentificationGuard]
  },
  {
    path: 'clientInstances/simulation/:clientInstanceId',
    component: SimulationComponent,
    canActivate: [AuthentificationGuard]
  },
  {
    path: 'clientInstances/:clientInstanceId/detectors',
    component: DetectorOverviewComponent,
    canActivate: [AuthentificationGuard]
  },
  {
    path: 'staticDataAnalyzer',
    component: StaticChartsComponent,
    canActivate: [AuthentificationGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  }
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
