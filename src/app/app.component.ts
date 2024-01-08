import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddItemComponent } from './add-item/add-item.component';
import { ItemService } from './Services/item.service';
import {MatPaginator, } from '@angular/material/paginator';
import {MatSort, } from '@angular/material/sort';
import {MatTableDataSource, } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = ['id', 'item', 'decp', 'price','date','stock','review','dt','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog:MatDialog, private _itemService:ItemService,private snackBar:MatSnackBar){}

ngOnInit(): void {
  this.getItemDetails()
}

  addItem(){
  const dialogeref=this._dialog.open(AddItemComponent,
    {
      // width:'100%',
      // height:'100%'
    })
    dialogeref.afterClosed().subscribe({
      next:(val:any)=>{
        if(val){
          this.getItemDetails();
        }
      }
    })
  }
  getItemDetails(){
    this._itemService.getItemlist().subscribe({
      next:(res:any)=>{
       this.dataSource=new MatTableDataSource(res);
       this.dataSource.sort=this.sort;
       this.dataSource.paginator =this.paginator;
        
      },
      error:console.log
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editItem(data:any){
   const dialogeref= this._dialog.open(AddItemComponent,
      {
        data,
        // width:'100%',
        // height:'100%'
      })
      dialogeref.afterClosed().subscribe({
        next:(val:any)=>{
          if(val){
            this.getItemDetails();
          }
        }
      })
  }

  deleteItem(id:number){
    this._itemService.deleteItem(id).subscribe({
      next:(res:any)=>{
        this.snackBar.open('Deleted Successfully !','Ok', {    
          duration: 3000,    
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: 'custom-style',
        })
        this.getItemDetails();
      },
      error:console.log
    })
  }


}
