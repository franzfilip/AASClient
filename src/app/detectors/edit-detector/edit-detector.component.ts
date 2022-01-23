import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
    name: new FormControl('', [Validators.required]),
    minValue: new FormControl('', [Validators.required]),
    maxValue: new FormControl('', [Validators.required]),
    detectorInterval: new FormControl('', [Validators.required]),
    fromTime: new FormControl('', [Validators.required]),
    untilTime: new FormControl('', [Validators.required]),
    lastMeasures: new FormControl('', [Validators.required]),
    listOperation: new FormControl('', [Validators.required]),
    detectorAction: new FormControl('', [Validators.required]),
    maxOutLiers: new FormControl('', [Validators.required]),
    measurementName: new FormControl('', [Validators.required]),
  });



  matcher = new MyErrorStateMatcher();

  constructor(public activeModal: NgbActiveModal) { }
  closeResult = '';

  ngOnInit(): void {
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
