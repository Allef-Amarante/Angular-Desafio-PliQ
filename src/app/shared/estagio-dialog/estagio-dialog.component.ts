import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Estagio } from 'src/app/Models/Estagio';

@Component({
  selector: 'app-estagio-dialog',
  templateUrl: './estagio-dialog.component.html',
  styleUrls: ['./estagio-dialog.component.css']
})
export class EstagioDialogComponent implements OnInit {
  estagio! : Estagio;
  isChange! : boolean;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: Estagio,
    public dialogRef: MatDialogRef<EstagioDialogComponent>,
  ) {}

  ngOnInit(): void {
    if(this.data.priority == null){
      this.isChange = true;
    }else{
      this.isChange = false;
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
