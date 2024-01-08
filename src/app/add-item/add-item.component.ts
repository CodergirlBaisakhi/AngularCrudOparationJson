import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ItemService } from '../Services/item.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {
  itemForm: FormGroup;
  DelivaryTimeS: string[] = [
    'Delivery by Tomowwer',
    'Delivery within 2days',
    'Delivery within 3days',
    'Delivery within 15days',
  ];
  constructor(private _fb: FormBuilder, private _itemServices: ItemService, @Inject(MAT_DIALOG_DATA) public data: any, private _dialogRef: MatDialogRef<AddItemComponent>,private snackBar:MatSnackBar
  ) {
    this.itemForm = this._fb.group({
      item: '',
      decp: '',
      price: '',
      date: '',
      stock: '',
      dt: '',
      review: ''
    })
  }
  ngOnInit(): void {
    this.itemForm.patchValue(this.data)
  }

  AddItem() {
    if (this.itemForm.valid) {
      if(this.data){
        this._itemServices.editItem(this.data.id,this.itemForm.value).subscribe({
          next: (val: any) => {
            this.snackBar.open('Updated Successfully !','Ok', {    
              duration: 3000,    
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              panelClass: 'custom-style',
            })
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.log(err);
  
          }
        })
      }
      else{

        this._itemServices.addItem(this.itemForm.value).subscribe({
          next: (val: any) => {
            this.snackBar.open('Added Successfully !','Ok', {    
              duration: 3000,    
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              panelClass: 'custom-style',
            })
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.log(err);
  
          }
        })
      }
      

    }
  }
}
