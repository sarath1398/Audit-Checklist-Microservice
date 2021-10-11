import { auditResponse } from './../models/auditResponse';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.css']
})
export class ChecklistComponent implements OnInit {

  auditType:string;
  auditDate : Date;
  questions:string[];
  responses:Array<string>;
  responseObject:auditResponse;
  responseDisableStatus=false;
  auditTypeStatus=false;

  constructor(private httpClient:HttpClient) 
  {
    this.auditType='';

    this.questions=[];
    this.auditDate = new Date();
    this.responses= new Array<string>(5);
    this.responseObject = new auditResponse();
  }

  ngOnInit(): void {
  }

  getQuestions()
  {
    this.httpClient.get<any>("https://localhost:44321/api/AuditChecklist?auditType="+this.auditType).subscribe(data=>
    {
      this.questions=data;
    });
    this.auditTypeStatus=true;
  }

  onSelectRadio(index:number,event:Event)
  {
    this.responses[index]=(event.target as HTMLInputElement).value;
    //console.log(this.responses);
  }

  sendResponse()
  {
    //console.log(this.responses);
    this.responseObject.auditType=this.auditType;
    this.responseObject.auditDate=this.auditDate;
    this.responseObject.responsesList=this.responses;
    
    console.log(this.responseObject);

    this.httpClient.post<auditResponse>("https://localhost:4200/api/checklistResponse",this.responseObject);   
    this.responseDisableStatus=true;
  }

}
