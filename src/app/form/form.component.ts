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
      dob:formatDate(this.searchForm.value.startdate, 'dd.MM.yyyy', 'en'),
      contexts:this.searchForm.value.contexts,
      address:this.searchForm.value.address,
      father_name:this.searchForm.value.father_name,
      state: this.searchForm.value.state,
      startdate:formatDate(this.searchForm.value.startdate, 'dd.MM.yyyy', 'en'),
                
    }

    // this.allData={
    //   "MCA": {
    //   "MCA Input": "{\"name\":\"Madhav Rai Prasad\",\"dob\":\"21-02-1989\",\"services\":\"mca_dir_combo\"}",
    //   "verify_id": "62cbe10883ca400eb234ca55",
    //   "MCA Output": "Send Cross directorship check for Manual review as Record found with only Name match (Contains)",
    //   "status": "Manual",
    //   "Start Time": "2022-07-11T04:36:24.390",
    //   "End Time": "2022-07-11T04:37:11.043",
    //   "Time Taken": 46
    //   },
    //   "WatchOut": {
    //   "WatchOut Input": "{\"firstname\":\"Madhav\",\"lastname\":\"Prasad\",\"middlename\":\"Rai\"}",
    //   "WatchOut Output": "Auto Tag Disqualified directorship as clear ",
    //   "status": "Clear",
    //   "Start Time": "2022-07-11T04:37:11.044",
    //   "End Time": "2022-07-11T04:37:13.002",
    //   "Time Taken": 1
    //   },
    //   "Loan Defaulter": {
    //   "Loan Defaulter Input": "{\"name\":\"Madhav Rai Prasad\",\"services\":\"credit_reputational_cibil\"}",
    //   "verify_id": "62cbe10883ca400eb234ca53",
    //   "Loan Defaulter Output": "Data is Empty.Auto Tag Loan Defaulter as Clear",
    //   "status": "Clear",
    //   "Start Time": "2022-07-11T04:36:24.390",
    //   "End Time": "2022-07-11T04:36:40.490",
    //   "Time Taken": 16
    //   },
    //   "WorldCheck": {
    //   "World Check Input": "{\"name\":\"Madhav Rai Prasad\",\"dob\":\"21-02-1989\",\"father_name\":\"Mr. XYZ\"}",
    //   "caseId": "",
    //   "World Check Output": "",
    //   "status": "",
    //   "Start Time": "2022-07-11T04:36:24.391",
    //   "End Time": "2022-07-11T04:36:24.632",
    //   "Time Taken": 0
    //   },
    //   "Manupatra": {
    //   "ManuPatra Input": "{\"formattedName\":\"Madhav Rai Prasad\"}",
    //   "ManuPatra Output": "Auto Tag Civil Litigation as clear.Data field of Raw Data is Empty",
    //   "status": "Clear",
    //   "Start Time": "2022-07-11T04:36:24.391",
    //   "End Time": "2022-07-11T04:36:30.615",
    //   "Time Taken": 6
    //   },
    //   "Adverse Media": {
    //   "Adverse media Input": "{\"name\":\"Madhav Rai Prasad\",\"dob\":\"21-02-1989\",\"contexts\":\"fraud,fugitive,murder\",\"services\":\"adverse_media\"}",
    //   "verify_id": "62cbe10883ca400eb234ca54",
    //   "Adverse Media Output": "Auto Tag Web & Media. Data is Empty",
    //   "status": "Clear",
    //   "Start Time": "2022-07-11T04:36:24.393",
    //   "End Time": "2022-07-11T04:37:11.008",
    //   "Time Taken": 46
    //   }
    //   }
      
      
  this.http.post(this.apiUrl,obj).subscribe(el=>{
    console.log(el)
    this.allData=el
      console.log(this.allData)   
      this.searchForm.reset();
  })
}


}
