import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  constructor(private http:HttpClient) { }
  allData:any
  public opened = false;
  inputDataObj:any;
  title:any;
  apiUrl='http://10.2.60.130:8487/api/india/onlineapi/'
  stateName:any=[]

  searchForm:FormGroup=new FormGroup({
    name:new FormControl('',Validators.required),
  din:new FormControl(),
  dob:new FormControl('',Validators.required),
  contexts:new FormControl(),
  address:new FormControl(),
  father_name:new FormControl(),
  state: new FormControl(),
  startdate:new FormControl(new Date())
  })
  ngOnInit(): void {
  }

  getState(){
    this.http.get('url').subscribe(el=>{
      console.log(el)
      this.stateName=el
    })
  }


  getValueLoop(item:any){
   return item
  }

  checkValueObj(obj:any){
    
    if(typeof(obj) === 'string' && obj.includes('{')){
      obj = JSON.parse(obj)
      return obj
    }
    else{
      return obj
    }
  }



  public close(status: string): void {
    this.opened = false;
  }

   openDialog(data:any,title:any) {
this.title=title
    this.inputDataObj = JSON.parse(data)
    this.opened = true;
  }

  onSearch(){
    let obj={
      name:this.searchForm.value.name,
      din:this.searchForm.value.din,
      dob:formatDate(this.searchForm.value.dob, 'dd.MM.yyyy', 'en'),
      contexts:this.searchForm.value.contexts,
      address:this.searchForm.value.address,
      father_name:this.searchForm.value.father_name,
      state: this.searchForm.value.state,
      startdate:formatDate(this.searchForm.value.startdate, 'dd.MM.yyyy', 'en'),
                
    }
    console.log(obj)
      
  this.http.post(this.apiUrl,obj).subscribe(el=>{
    console.log(el)
    this.allData=el
      console.log(this.allData)   
      this.searchForm.reset();
  })
}


}
