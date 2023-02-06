import { EstagioDialogComponent } from './../../shared/estagio-dialog/estagio-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Estagio } from 'src/app/Models/Estagio';
import { EstagioServices } from 'src/app/Seervices/EstagioServices';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [EstagioServices]
})
export class HomeComponent implements OnInit{
  @ViewChild(MatTable)
  table!: MatTable<any>
  displayedColumns: string[] = ['id', 'name', 'priority', 'actions'];
  dataSource! : Estagio[];

  constructor(
    public dialog: MatDialog,
    public estagioService :EstagioServices
    ) {
      this.estagioService.getEstagios()
      .subscribe((data: Estagio[]) => {
        console.log(data);
        this.dataSource = data;
      });
    }
  
   ngOnInit(): void {
    
  }

  openDialog(estagio: Estagio | null) : void {
    const dialogRef = this.dialog.open(EstagioDialogComponent, {
      width: '250px', 
      data: estagio === null ?{        
        priority : '',
        name: ''
      } : {    
        id: estagio.id,    
        priority: estagio.priority,
        name: estagio.name
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined){
        console.log(result)
        if(this.dataSource.map(p => p.id).includes(result.id)){
          this.estagioService.editEstagios(result)
          .subscribe((data: Estagio) => {
            const index = this.dataSource.findIndex(p => p.id === data.id);
            this.dataSource[index] = data;
            this.table.renderRows(); 
          });
           
          }else{
            this.estagioService.createEstagios(result)
            .subscribe((data: Estagio) =>{
              this.dataSource.push(data);
              this.table.renderRows();
            });
            
          }        
      }
    });
  }

  editEstagio(estagio: Estagio ) : void {
    this.openDialog(estagio);
  }

  deleteEstagio(id: number) : void {
    this.estagioService.deleteEstagios(id)
    .subscribe(() => {
      this.dataSource = this.dataSource.filter(p => p.id !== id);
    });
    
  }
}
