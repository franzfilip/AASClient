import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { ClientInstanceDto } from '../models/clientinstance/clientinstancedto';
import { CreateMeasurementLog } from '../models/measurementlog/create-measurement-log';
import { MetricCreationDto } from '../models/metric/metric-creation-dto';
import { ClientService } from '../services/client.service';
import { ManagerService } from '../services/manager.service';

@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.scss']
})
export class SimulationComponent implements OnInit, OnDestroy {

  isSimulationRunning: boolean = false;
  simulation: Subscription = new Subscription();
  clientInstance: ClientInstanceDto = {
    id: "",
    identifier: "",
    appKey: ""
  };

  errorLogCount: number = 0;
  warningLogCount: number = 0;
  traceLogCount: number = 0;
  counterMetricCount: number = 0;
  timespanMetricCount: number = 0;
  measurementMetricCount: number = 0;
  errorCount: number = 0;
  requestsSent: number = 0;

  createCpuMetrics: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private managerService: ManagerService, private clientService: ClientService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      if(params.get("clientInstanceId") !== null){
        this.managerService.getClientInstanceById(params.get("clientInstanceId") || "").subscribe(clientInstance => {
          this.clientInstance = clientInstance;
        });
      }
    })
  }

  ngOnDestroy(): void {
    this.simulation.unsubscribe();
  }

  setup(){
    this.errorCount = 0;
    this.errorLogCount = 0;
    this.warningLogCount = 0;
    this.traceLogCount = 0;
    this.counterMetricCount = 0;
    this.timespanMetricCount = 0;
    this.measurementMetricCount = 0;
    this.errorCount = 0;
    this.requestsSent = 0;
  }

  startSimulation(){
    this.setup();
    this.isSimulationRunning = !this.isSimulationRunning;
    this.simulation = interval(100).subscribe(val => {
      if(this.requestsSent == 99){
        this.stopSimulation();
      }
      if(this.createCpuMetrics){
        this.simulateCpuMetrics();
      }
      else{
        this.simulateDefault();
      }
    });
  }

  simulateCpuMetrics(){
    let metric = this.clientService.getCPUDummyMetric(this.clientInstance.id);
    this.clientService.createMetric(metric, this.clientInstance.appKey).subscribe(result => {
      this.measurementMetricCount++;
      this.requestsSent++;
      console.log("Created Metric with GUID: ", result);
    },
    error => {
      this.requestsSent++;
      this.errorCount++;
    });
  }

  simulateDefault() {
    const logOrMetric = Math.floor(Math.random() * 2);
    if(logOrMetric === 0){
      let log = this.clientService.getDummyMeasurementLog(this.clientInstance.id);
      this.clientService.createMeasurementLog(log, this.clientInstance.appKey).subscribe(result => {
        if(log.type === "Error"){
          this.errorLogCount++;
        }
        else if(log.type === "Warning"){
          this.warningLogCount++;
        }
        else if(log.type === "Trace"){
          this.traceLogCount++;
        }

        this.requestsSent++;
        console.log("Created Log with GUID: ", result);
      },
      error => {
        this.requestsSent++;
        this.errorCount++;
      });
    }
    else{
      let metric = this.clientService.getDummyMetric(this.clientInstance.id);
      this.clientService.createMetric(metric, this.clientInstance.appKey).subscribe(result => {
        if(metric.counter){
          this.counterMetricCount++;
        }
        else if(metric.endedAt){
          this.timespanMetricCount++;
        }
        else if(metric.measurement){
          this.measurementMetricCount++;
        }

        this.requestsSent++;
        console.log("Created Metric with GUID: ", result);
      },
      error => {
        this.requestsSent++;
        this.errorCount++;
      });
    }
  }

  stopSimulation(){
    this.isSimulationRunning = !this.isSimulationRunning;
    this.simulation.unsubscribe();
  }

}
