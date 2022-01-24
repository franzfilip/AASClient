import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetectorCreationDto } from 'src/app/models/detector/detectorcreationdto';
import { DetectorUpdateDto } from 'src/app/models/detector/detectorupdatedto';
import { ManagerService } from 'src/app/services/manager.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-edit-detector',
  templateUrl: './edit-detector.component.html',
  styleUrls: ['./edit-detector.component.scss']
})
export class EditDetectorComponent implements OnInit {

  editDetector = new FormGroup({
    name: new FormControl('', Validators.required),
    minValue: new FormControl(''),
    maxValue: new FormControl(''),
    detectorInterval: new FormControl('', Validators.required),
    fromTime: new FormControl(''),
    untilTime: new FormControl(''),
    lastMeasures: new FormControl(''),
    listOperation: new FormControl('', Validators.required),
    maxOutLiers: new FormControl('', Validators.required),
    measurementName: new FormControl('', Validators.required),
  });
  matcher = new MyErrorStateMatcher();

  constructor( @Inject(MAT_DIALOG_DATA) public data: any, private managerService: ManagerService, private dialogRef: MatDialogRef<EditDetectorComponent>) { }
  closeResult = '';

  ngOnInit(): void {
    if(this.data.detector != undefined){
      this.editDetector.controls["name"].patchValue(this.data.detector.name);
      this.editDetector.controls["minValue"].patchValue(this.data.detector.minValue);
      this.editDetector.controls["maxValue"].patchValue(this.data.detector.maxValue);
      this.editDetector.controls["detectorInterval"].patchValue(this.data.detector.detectorInterval);
      this.editDetector.controls["fromTime"].patchValue(this.data.detector.fromTime);
      this.editDetector.controls["untilTime"].patchValue(this.data.detector.untilTime);
      this.editDetector.controls["lastMeasures"].patchValue(this.data.detector.lastMeasures);
      this.editDetector.controls["listOperation"].patchValue(this.data.detector.listOperation);
      this.editDetector.controls["maxOutLiers"].patchValue(this.data.detector.maxOutLiers);
      this.editDetector.controls["measurementName"].patchValue(this.data.detector.measurementName);
    }
  }

  save(){

    if(this.data.detector == undefined){
      let detector: DetectorCreationDto = {
        name: this.editDetector.controls["name"].value,
        minValue: this.editDetector.controls["minValue"].value != undefined ? this.editDetector.controls["minValue"].value : 0,
        maxValue: this.editDetector.controls["maxValue"].value != undefined ? this.editDetector.controls["maxValue"].value : 0,
        detectorInterval: this.editDetector.controls["detectorInterval"].value,
        fromTime: this.editDetector.controls["fromTime"].value != undefined ? this.editDetector.controls["fromTime"].value : 100000000,
        untilTime: this.editDetector.controls["untilTime"].value != undefined ? this.editDetector.controls["untilTime"].value: 100000000,
        lastMeasures: this.editDetector.controls["lastMeasures"].value != undefined ? this.editDetector.controls["lastMeasures"].value : 10,
        listOperation: this.editDetector.controls["listOperation"].value,
        maxOutLiers: this.editDetector.controls["maxOutLiers"].value != undefined ? this.editDetector.controls["maxOutLiers"].value : 10,
        clientInstanceId: this.data.clientInstanceId,
        detectorActionId: this.data.detectorActionId,
        isActive: true,
        measurementName:  this.editDetector.controls["measurementName"].value
      }

      this.managerService.createDetector(detector).subscribe(result => {
        console.log(result);
        this.dialogRef.close(true);
      },
      error => {
        console.error(error);
        this.dialogRef.close(false);
      })
    }
    else{
      let detector: DetectorUpdateDto = {
        id: this.data.detector.id,
        name: this.editDetector.controls["name"].value,
        minValue: this.editDetector.controls["minValue"].value != undefined ? this.editDetector.controls["minValue"].value : 0,
        maxValue: this.editDetector.controls["maxValue"].value != undefined ? this.editDetector.controls["maxValue"].value : 0,
        detectorInterval: this.editDetector.controls["detectorInterval"].value,
        fromTime: this.editDetector.controls["fromTime"].value != undefined ? this.editDetector.controls["fromTime"].value : 100000000,
        untilTime: this.editDetector.controls["untilTime"].value != undefined ? this.editDetector.controls["untilTime"].value: 100000000,
        lastMeasures: this.editDetector.controls["lastMeasures"].value != undefined ? this.editDetector.controls["lastMeasures"].value : 10,
        listOperation: this.editDetector.controls["listOperation"].value,
        maxOutLiers: this.editDetector.controls["maxOutLiers"].value != undefined ? this.editDetector.controls["maxOutLiers"].value : 10,
        clientInstanceId: this.data.clientInstanceId,
        detectorActionId: this.data.detectorActionId,
        isActive: true,
        measurementName:  this.editDetector.controls["measurementName"].value
      }

      this.managerService.updateDetector(detector).subscribe(result => {
        console.log(result);
        this.dialogRef.close(true);
      },
      error => {
        console.error(error);
        this.dialogRef.close(false);
      })
    }
  }

  close(){
    this.dialogRef.close(true);
  }

}
