import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ReferenceForm } from 'src/app/reusable/models/faculty-options';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-refer-user',
  templateUrl: './refer-user.component.html',
  styleUrls: ['./refer-user.component.css']
})
export class ReferUserComponent implements OnInit {

  refFaculty: ReferenceForm =new ReferenceForm()
  refStudent: ReferenceForm =new ReferenceForm()
  module_endpoint= environment.server_endpoint
  
  constructor(
    private http: HttpClient,
    private messageService: MessageService
    ) { }

  ngOnInit() {
  }

  onReferenceSubmit(form: NgForm,referedRole: string, toastKey: string){
    let obj={...form.form.value}
    obj['referedRole']=referedRole

    this.http.post(this.module_endpoint.refer.referStudentFaculty, obj)
          .subscribe(data => {
            this.messageService.add(
              {key: toastKey, severity:'success', summary:'Thank you', 
              detail:'Referal code has been sent'});
          }, error => {
            console.log(error)
            this.messageService.add(
              {key: toastKey, severity:'error', summary:'Error', 
              detail:error['error']['msg']});
      })
  }

}
