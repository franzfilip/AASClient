import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MeasurementlogOverviewComponent } from './measurementlog/measurementlog-overview/measurementlog-overview.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap' ;
import { TicksToDatePipe } from './ticks-to-date-pipe';
import { ClientinstanceOverviewComponent } from './clientinstance/clientinstance-overview/clientinstance-overview.component';
import { SimulationComponent } from './simulation/simulation.component';
import { DetectorOverviewComponent } from './detectors/detector-overview/detector-overview.component';
import { TicksToSecondsPipe } from './ticks-to-seconds-pipe';
import { LoadinganimationComponent } from './loadinganimation/loadinganimation.component';
import { EditDetectorComponent } from './detectors/edit-detector/edit-detector.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MatInputModule, MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Chart } from 'chart.js';
import { StaticChartsComponent } from './charts/static-charts/static-charts.component';

@NgModule({
  declarations: [
    AppComponent,
    MeasurementlogOverviewComponent,
    TicksToDatePipe,
    TicksToSecondsPipe,
    ClientinstanceOverviewComponent,
    SimulationComponent,
    DetectorOverviewComponent,
    LoadinganimationComponent,
    EditDetectorComponent,
    StaticChartsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCheckboxModule,
    Chart
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
