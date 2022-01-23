import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateMeasurementLog } from '../models/measurementlog/create-measurement-log';
import { MeasurementlogDto } from '../models/measurementlog/measurementlogdto';
import { MetricCreationDto } from '../models/metric/metric-creation-dto';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiUrl: string = "";

  constructor(private http: HttpClient) {
    this.setup();
  }

  private setup(){
    this.apiUrl = `${environment.baseUrl}/Client`;
  }

  public getDummyMeasurementLog(clientInstanceId: string): CreateMeasurementLog {
    const logTypes = ["Error", "Trace", "Warning"];
    const randomLogType = Math.floor(Math.random() * logTypes.length);
    var date: Date = new Date();
    date.setHours(date.getHours() + 1);

    return {
      clientInstanceId: clientInstanceId,
      createdAt: this.getTicksFromDate(date),
      measurementName: "Dummyname from Client",
      message: "DummyMessage from Client",
      type: logTypes[randomLogType]
    } as CreateMeasurementLog;
  }

  public getDummyMetric(clientInstanceId: string): MetricCreationDto {
    const randomMetricType = Math.floor(Math.random() * 3);
    var date: Date = new Date();
    date.setHours(date.getHours() + 1);

    let metric: MetricCreationDto =  {
      clientInstanceId: clientInstanceId,
      createdAt: this.getTicksFromDate(date),
      measurementName: ""
    };

    //CounterMetric
    if(randomMetricType === 0){
      metric.measurementName = "Dummy CounterMetric";
      metric.counter = 20;
    }
    else if(randomMetricType === 1){
      metric.measurementName = "Dummy TimeSpanMetric";
      date.setMinutes(date.getMinutes() + 1);
      metric.endedAt = this.getTicksFromDate(date);
    }
    else if(randomMetricType === 2){
      metric.measurementName = "Dummy MeasurementMetric";
      metric.measurement = 23.45;
    }

    return metric;
  }

  public getCPUDummyMetric(clientInstanceId: string): MetricCreationDto {
    var date: Date = new Date();
    date.setHours(date.getHours() + 1);

    let metric: MetricCreationDto =  {
      clientInstanceId: clientInstanceId,
      createdAt: this.getTicksFromDate(date),
      measurementName: "CPU-Temperature"
    };

    metric.measurement = Math.random() * (80 - 70) + 70;

    return metric;
  }

  public createMeasurementLog(measurementlog: CreateMeasurementLog, appKey: string): Observable<string> {
    const headerDict = {
      "AppKey": appKey
    };

    return this.http.post<string>(this.apiUrl + "/CreateMeasurementLog", measurementlog, {
      headers: new HttpHeaders(headerDict)
    });
  }

  private getTicksFromDate(date: Date): number{
    return (date.getTime() * 10000) + 621355968000000000;
  }

  public createMetric(metric: MetricCreationDto, appKey: string): Observable<string>{
    const headerDict = {
      "AppKey": appKey
    };

    return this.http.post<string>(this.apiUrl + "/CreateMetric", metric, {
      headers: new HttpHeaders(headerDict)
    });
  }
}
