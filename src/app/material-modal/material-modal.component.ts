import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-material-modal',
  templateUrl: './material-modal.component.html',
  styleUrls: ['./material-modal.component.css']
})
export class MaterialModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<MaterialModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
}
