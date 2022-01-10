import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MeasurementlogDto } from 'src/app/models/measurmentlog/measurementlogdto';
import { ManagerService } from 'src/app/services/manager.service';

@Component({
  selector: 'app-measurementlog-overview',
  templateUrl: './measurementlog-overview.component.html',
  styleUrls: ['./measurementlog-overview.component.scss']
})
export class MeasurementlogOverviewComponent implements OnInit {
  measurementLogsToRender: MeasurementlogDto[] = [];
  measurementLogs: MeasurementlogDto[] = [];
  filter = new FormControl('');
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  
  constructor(private manager: ManagerService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.manager.getAllMeasurementLogs().subscribe((data) => {
      console.log(data);
      this.measurementLogs = data;
      this.refreshPage();
    });
  }

  refreshPage() {
    this.measurementLogsToRender = this.measurementLogs
      // .map((country, i) => ({...country}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
    console.log(this.measurementLogsToRender);
  }
}
