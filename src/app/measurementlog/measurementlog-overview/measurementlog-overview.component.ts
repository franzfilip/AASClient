import { Component, OnInit, PipeTransform } from '@angular/core';
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
  
  constructor(private manager: ManagerService) {
    this.filter.valueChanges.subscribe(text => {
      console.log(text);
      this.refreshPage(text);
    });
    // this.countries$ = this.filter.valueChanges.pipe(
    //   startWith(''),
    //   map(text => search(text, pipe))
    // );
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.manager.getAllMeasurementLogs().subscribe((data) => {
      this.measurementLogs = data;
      this.refreshPage();
    });
  }

  refreshPage(text: string = "") {
    if(text.length == 0){
      this.measurementLogsToRender = this.measurementLogs
      // .map((country, i) => ({...country}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
    }
    else{
      this.measurementLogsToRender = this.search(text);
    }
  }

  search(text: string): MeasurementlogDto[] {
    this.page = 1;
    return this.measurementLogs.filter(measurementlog => {
      const term = text.toLowerCase();
      return measurementlog.measurementName.toLowerCase().includes(term)
          || measurementlog.message.toLowerCase().includes(term)
          || measurementlog.type.toLowerCase().includes(term)
          // || pipe.transform(country.area).includes(term)
          // || pipe.transform(country.population).includes(term);
    });
  }
}
