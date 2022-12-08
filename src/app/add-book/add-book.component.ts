import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SampleServiceService } from '../sample-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  // isdisabled:boolean=true;


  formdata:any;
  
  constructor(public dialog:MatDialog,private serv: SampleServiceService ,@Inject(MAT_DIALOG_DATA) public data: any,private _snackBar:MatSnackBar){}

  ngOnInit():void{
    

    this.formdata=new FormGroup({
      bookName: new FormControl(this.data?.bookName??'',Validators.required),
      author : new FormControl(this.data?.author??''),
      genre: new FormControl(this.data?.genre??'')
      
    
    })
    
  }
submit(data:any){
  this.serv.createELEMENT_DATA({...data.value,bookName:data.value['bookName']}).subscribe(s =>{
   window.location.reload();
    
    
  });
  this.dialog.closeAll();
  
  
}
update(data:any){
  
this.serv.editELEMENT_DATA({...data, id: this.data.id}).subscribe(u=>{
  
  this.dialog.closeAll();
   window.location.reload();

})}

openSnackBar(){
  this._snackBar.open("Update Successfull")
}

}
