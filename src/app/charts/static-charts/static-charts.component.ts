import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChartDataset, ChartType, ChartTypeRegistry } from 'chart.js';
import { MetricDto } from 'src/app/models/metric/metric-dto';
import { ChartWrapper } from 'src/app/models/Utils/chartwrapper';
import { CreateChart } from 'src/app/models/Utils/createchart';
import { ManagerService } from 'src/app/services/manager.service';
import { TicksToDatePipe } from 'src/app/ticks-to-date-pipe';
import { EditChartComponent } from '../edit-chart/edit-chart.component';

@Component({
  selector: 'app-static-charts',
  templateUrl: './static-charts.component.html',
  styleUrls: ['./static-charts.component.scss']
})
export class StaticChartsComponent implements OnInit {
  charts: ChartWrapper[] = [];
  metrics: MetricDto[] = [];

  constructor(private managerService: ManagerService, private modalService: NgbModal, private ticksToDatePipe: TicksToDatePipe) { }

  ngOnInit(): void {
    this.managerService.getMetrics("781fd682-b210-4a77-9848-e6f70af150eb", "CPU-Temperature").subscribe(result => {
      this.metrics = result;
      this.charts.push(this.createCpuTempChart(result));
    });
  }

  createCpuTempChart(metrics: MetricDto[]): ChartWrapper{
    let xData: string[] = [];
    let yData: number[] = [];
    
    let arr = metrics.sort(function(a, b){
      return a.measurement - b.measurement;
    });

    type data = [number, number];
    let tuple: data[] = [];
    arr.forEach(metric => {
      let index = tuple.findIndex(d => d[0] == Math.round(metric.measurement));
      if(index == -1){
        tuple.push([Math.round(metric.measurement), 0]);
      }
      else{
        tuple[index][1]++;
      }
    });

    tuple.forEach(t  => {
      xData.push(t[0] + "°");
      yData.push(t[1]);
    });

    return {
      chartData: [{data: yData, label: "Anzahl Messungen"}],
      chartLabels: xData,
      chartOptions: {responsive: true},
      chartType: "bar"
    };
  }

  chartTypeChanged(value: any, index: number){
    this.charts[index].chartType = value;
  }

  createNewChart(){
    this.modalService.open(EditChartComponent, {ariaLabelledBy: 'modal-basic-title'}).result.then((result: CreateChart) => {
      this.displayNewChart(result);
    });
  }

  displayNewChart(chart: CreateChart){
    let xData: string[] = [];
    let yData: any[] = [];

    this.managerService.getMetrics("781fd682-b210-4a77-9848-e6f70af150eb").subscribe(result => {
      result.forEach(metric => {
        if(metric.measurementName == chart.measurementname){
          xData.push(this.ticksToDatePipe.transform(metric.createdAt));
          if(chart.type == "counter"){
            yData.push(metric.counter);
          }
          else if(chart.type == "measurement"){
            yData.push(metric.measurement);
          }
          else if(chart.type == "timespan"){
            yData.push(5);
          }
        }
      });
  
      this.charts.push({
        chartData: [{data: yData}],
        chartLabels: xData,
        chartOptions: {responsive: true},
        chartType: chart.style
      });
    });

  }
}
