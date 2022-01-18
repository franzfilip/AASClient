import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ClientInstanceDto } from '../models/clientinstance/clientinstancedto';
import { DetectorDto } from '../models/detector/detectordto';
import { MeasurementlogDto } from '../models/measurmentlog/measurementlogdto';

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

  getMeasurementLogsByClientInstanceId(clientInstanceId: string = "F33D29CA-EAD6-4AAA-830A-4972D7EF06D7"): Observable<Array<MeasurementlogDto>> {
    let params = new HttpParams();

    if(clientInstanceId !== null){
      params = params.append("clientInstanceId", clientInstanceId);
    }

    return this.http.get<Array<MeasurementlogDto>>(this.apiUrl + "/MeasurementLog", {
      params: params
    });
  }

  getClientInstancesByAppKey(appKey: string = "testkey03"): Observable<Array<ClientInstanceDto>> {
    const headerDict = {
      "AppKey": appKey
    };
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new Headers(headerDict), 
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
  
}
