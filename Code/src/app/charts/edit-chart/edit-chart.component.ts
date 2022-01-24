import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateChart } from 'src/app/models/Utils/createchart';

@Component({
  selector: 'app-edit-chart',
  templateUrl: './edit-chart.component.html',
  styleUrls: ['./edit-chart.component.scss']
})
export class EditChartComponent implements OnInit {

  createChart = new FormGroup({
    measurementname: new FormControl('', [Validators.required]),
    style: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
  });
  
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  save(){
    this.activeModal.close({
      measurementname: this.createChart.controls["measurementname"].value,
      style: this.createChart.controls["style"].value,
      type: this.createChart.controls["type"].value
    } as CreateChart);
  }

}
