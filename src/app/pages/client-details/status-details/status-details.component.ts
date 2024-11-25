import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { StatusRendererComponent } from '../status-renderer/status-renderer.component';

@Component({
  selector: 'app-status-details',
  standalone: true,
  imports: [StatusRendererComponent],
  templateUrl: './status-details.component.html',
  styleUrl: './status-details.component.scss'
})
export class StatusDetailsComponent {
  data:any;
  config = {
    class: 'modal-lg',  // Set modal size (e.g., large size)
    backdrop: true,     // Optionally enable backdrop
  };
  agInit(params: any): void {
     console.log(params)
     this.data= params.data;
     console.log(this.data);
    //  this.clientStatus =params.value;
    //  this.params = params;
    //  this.gridApi = params.api;
   }

   getStatus(status:string){
    switch(status){
      case 'completed':
        return 'Completed'
      case 'followUp':
        return 'Follow-Up'
      default:
        return 'Due'
    }
   }

   getRowInfo(event:any){
    console.log(event?.target?.value)
   }

   modalRef?: BsModalRef;

  constructor(private modalService: BsModalService) {}
  clientDetail:any;
  openModal(data:any,template: any) {
   // console.log(data)
    this.clientDetail={};
    this.clientDetail={...data};
    this.modalRef = this.modalService.show(template,this.config);
  }

 
}
