import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientInstanceDto } from 'src/app/models/clientinstance/clientinstancedto';
import { DetectorDto } from 'src/app/models/detector/detectordto';
import { ManagerService } from 'src/app/services/manager.service';
import { EditDetectorComponent } from '../edit-detector/edit-detector.component';

@Component({
  selector: 'app-detector-overview',
  templateUrl: './detector-overview.component.html',
  styleUrls: ['./detector-overview.component.scss']
})
export class DetectorOverviewComponent implements OnInit {
  initialDetectors: DetectorDto[] = [];
  filteredDetectors: DetectorDto[] = [];
  detectorsToRender: DetectorDto[] = [];
  filter = new FormControl('');

  page = 1;
  pageSize = 10;
  collectionSize = 0;

  clientInstance: ClientInstanceDto = {
    id: "",
    identifier: "",
    appKey: ""
  };

  constructor(private activatedRoute: ActivatedRoute, private managerService: ManagerService, private modalService: NgbModal) {
    this.filter.valueChanges.subscribe((text:string) => {
      if(text.length > 0){
        this.filterList();
      }
    });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      if(params.get("clientInstanceId") !== null){
        this.managerService.getClientInstanceById(params.get("clientInstanceId") || "").subscribe(clientInstance => {
          this.clientInstance = clientInstance;
          this.loadDetectors();   
        });
      }
    });
  }

  loadDetectors(){
    this.managerService.getDetectorsByClientInstanceId(this.clientInstance.id).subscribe((detectors: DetectorDto[]) => {
      this.initialDetectors = this.filteredDetectors = detectors;

      this.navigatePage(this.initialDetectors);
    });
  }

  filterList(){
    let searchString:string = this.filter.value;
    if(searchString && searchString.length > 0){
      this.filteredDetectors = this.search(searchString);
      this.navigatePage(this.filteredDetectors);
    }
  }

  navigatePage(detectors: DetectorDto[]) {
    this.detectorsToRender = detectors.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  changePage(){
    this.navigatePage(this.filteredDetectors);
  }

  search(text: string): DetectorDto[] {
    this.page = 1;
    return this.initialDetectors.filter(detector => {
      const term = text.toLowerCase();
      return detector.name.toLowerCase().includes(term)
      || detector.measurementName.toLowerCase().includes(term)
    });
  }

  editDetector(detector: DetectorDto){
    this.modalService.open(EditDetectorComponent, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      console.log(`Closed with: ${result}`);
    }, (reason) => {
      console.log(`Dismissed ${reason}`);
    });
  }

}
