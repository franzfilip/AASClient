import { Component, OnInit, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MeasurementlogDto } from 'src/app/models/measurementlog/measurementlogdto';
import { ManagerService } from 'src/app/services/manager.service';

@Component({
  selector: 'app-measurementlog-overview',
  templateUrl: './measurementlog-overview.component.html',
  styleUrls: ['./measurementlog-overview.component.scss']
})
export class MeasurementlogOverviewComponent implements OnInit {
  initialMeasurementLogs: MeasurementlogDto[] = [];
  filteredMeasurementLogs: MeasurementlogDto[] = [];
  measurementLogsToRender: MeasurementlogDto[] = [];
  filter = new FormControl('');
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  
  constructor(private manager: ManagerService) {
    this.filter.valueChanges.subscribe((text:string) => {
      if(text.length > 0){
        this.filterList();
      }
      else{
        this.filteredMeasurementLogs = this.initialMeasurementLogs;
        this.navigatePage(this.initialMeasurementLogs);
      }
    });
  }

  ngOnInit(): void {
    this.loadMeasurementLogs();
  }

  loadMeasurementLogs(){
    this.manager.getMeasurementLogsByClientInstanceId().subscribe((data) => {
      this.initialMeasurementLogs = this.filteredMeasurementLogs = data;
      this.navigatePage(this.filteredMeasurementLogs);
    });
  }

  navigatePage(measurementLogs: MeasurementlogDto[]) {
    this.measurementLogsToRender = measurementLogs.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  changePage(){
    this.navigatePage(this.filteredMeasurementLogs);
  }

  search(text: string): MeasurementlogDto[] {
    this.page = 1;
    return this.initialMeasurementLogs.filter(measurementlog => {
      const term = text.toLowerCase();
      return measurementlog.measurementName.toLowerCase().includes(term)
          || measurementlog.message.toLowerCase().includes(term)
          || measurementlog.type.toLowerCase().includes(term)
    });
  }

  filterList(){
    let searchString:string = this.filter.value;
    if(searchString && searchString.length > 0){
      this.filteredMeasurementLogs = this.search(searchString);
      this.navigatePage(this.filteredMeasurementLogs);
    }
  }
}
