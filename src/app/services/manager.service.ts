import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ClientInstanceDto } from '../models/clientinstance/clientinstancedto';
import { DetectorDto } from '../models/detector/detectordto';
import { MeasurementlogDto } from '../models/measurementlog/measurementlogdto';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  private apiUrl: string = "";

  constructor(private http: HttpClient) {
    this.setup();
  }

  private setup(){
    this.apiUrl = `${environment.baseUrl}/Management`;
  }

  getMeasurementLogsByClientInstanceId(clientInstanceId: string = "781FD682-B210-4A77-9848-E6F70AF150EB"): Observable<Array<MeasurementlogDto>> {
    let params = new HttpParams();

    if(clientInstanceId !== null){
      params = params.append("clientInstanceId", clientInstanceId);
    }

    return this.http.get<Array<MeasurementlogDto>>(this.apiUrl + "/MeasurementLog", {
      params: params
    });
  }

  getClientInstancesByAppKey(appKey: string = "testkey02"): Observable<Array<ClientInstanceDto>> {
    const headerDict = {
      "AppKey": appKey
    };
    
    return this.http.get<Array<ClientInstanceDto>>(this.apiUrl + "/ClientInstance", {
      headers: new HttpHeaders(headerDict)
    });
  }

  getDetectorsByClientInstanceIdAndMeasurementName(clientInstanceId: string, measurementName: string = ""): Observable<Array<DetectorDto>> {
    let params = new HttpParams();

    if(clientInstanceId !== null){
      params = params.append("clientInstanceId", clientInstanceId);
    }

    if(measurementName.length > 0){
      params = params.append("measurementName", measurementName);
    }

    return this.http.get<Array<DetectorDto>>(this.apiUrl + "/Detector", {
      params: params
    });
  }

  getClientInstanceById(clientInstanceId: string): Observable<ClientInstanceDto>{
    return this.http.get<ClientInstanceDto>(this.apiUrl + "/ClientInstance/" + clientInstanceId);
  }

  getDetectorsByClientInstanceId(clientInstanceId: string): Observable<Array<DetectorDto>>{
    let params = new HttpParams();

    if(clientInstanceId !== null){
      params = params.append("clientInstanceId", clientInstanceId);
    }
    
    return this.http.get<Array<DetectorDto>>(this.apiUrl + "/Detector", {
      params: params
    });
  }
  
}
