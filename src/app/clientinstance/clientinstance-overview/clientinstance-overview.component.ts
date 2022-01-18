import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientInstanceDto } from 'src/app/models/clientinstance/clientinstancedto';
import { ClientInstanceWithAdditionalInformation } from 'src/app/models/clientinstance/clientinstancewithadditionalinformation';
import { ManagerService } from 'src/app/services/manager.service';

@Component({
  selector: 'app-clientinstance-overview',
  templateUrl: './clientinstance-overview.component.html',
  styleUrls: ['./clientinstance-overview.component.scss']
})
export class ClientinstanceOverviewComponent implements OnInit {
  initialClientInstances: ClientInstanceWithAdditionalInformation[] = [];
  filteredClientInstances: ClientInstanceWithAdditionalInformation[] = [];
  clientInstancesToRender: ClientInstanceWithAdditionalInformation[] = [];

  page = 1;
  pageSize = 10;
  collectionSize = 0;

  filter = new FormControl('');

  constructor(private managerService: ManagerService, private router: Router) {
    this.filter.valueChanges.subscribe((text:string) => {
      if(text.length > 0){
        this.filterList();
      }
    });
  }

  ngOnInit(): void {
    this.loadClientInstances();
  }

  loadClientInstances(){
    this.managerService.getClientInstancesByAppKey().subscribe(clientInstances => {
      let data: ClientInstanceWithAdditionalInformation[] = [];

      clientInstances.forEach(clientInstance => {
        let clientInstanceWithAdditionalInformation: ClientInstanceWithAdditionalInformation = {
          id: clientInstance.id,
          appKey: clientInstance.appKey,
          identifier: clientInstance.identifier,
          detectorCount: 0,
          measurementLogCount: 0,
          isActive: false
        };

        data.push(clientInstanceWithAdditionalInformation);

        this.managerService.getDetectorsByClientInstanceIdAndMeasurementName(clientInstance.id).subscribe(detectors => {
          data[data.findIndex(ci => ci.id == clientInstance.id)].detectorCount = detectors.length;
        });

        this.managerService.getMeasurementLogsByClientInstanceId(clientInstance.id).subscribe(measurementLogs => {
          data[data.findIndex(ci => ci.id == clientInstance.id)].measurementLogCount = measurementLogs.length;
        });
      })
      this.initialClientInstances = this.filteredClientInstances = data;
      this.navigatePage(this.initialClientInstances);
    });
  }

  navigatePage(measurementLogs: ClientInstanceWithAdditionalInformation[]) {
    this.clientInstancesToRender = measurementLogs.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  changePage(){
    this.navigatePage(this.filteredClientInstances);
  }

  search(text: string): ClientInstanceWithAdditionalInformation[] {
    this.page = 1;
    return this.initialClientInstances.filter(clientInstance => {
      const term = text.toLowerCase();
      return clientInstance.identifier.toLowerCase().includes(term)
    });
  }

  filterList(){
    let searchString:string = this.filter.value;
    if(searchString && searchString.length > 0){
      this.filteredClientInstances = this.search(searchString);
      this.navigatePage(this.filteredClientInstances);
    }
  }

  navigateToSimulation(id: string){
    this.router.navigate(["clientInstances/simulation", id]);
  }

}
