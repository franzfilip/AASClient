import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MeasurementlogDto } from '../models/measurmentlog/measurementlogdto';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  apiUrl: string = "";

  constructor(private http: HttpClient) {
    this.setup();
  }

  private setup(){
    this.apiUrl = `${environment.baseUrl}/Management`;
  }

  getAllMeasurementLogs(clientInstanceId: string = "F33D29CA-EAD6-4AAA-830A-4972D7EF06D7"): Observable<Array<MeasurementlogDto>> {
    let params = new HttpParams();

    if(clientInstanceId !== null){
      params = params.append("clientInstanceId", clientInstanceId);
    }

    return this.http.get<Array<MeasurementlogDto>>(this.apiUrl + "/MeasurementLog", {
      params: params
    });
  }
}
