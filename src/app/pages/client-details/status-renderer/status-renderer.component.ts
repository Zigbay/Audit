import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridApi, GridReadyEvent, SizeColumnsToFitGridStrategy } from 'ag-grid-community';
import { CollapseModule } from 'ngx-bootstrap/collapse';
@Component({
  selector: 'app-status-renderer',
  standalone: true,
  imports: [CommonModule,AgGridAngular,CollapseModule],
  templateUrl: './status-renderer.component.html',
  styleUrl: './status-renderer.component.scss'
})
export class StatusRendererComponent implements OnChanges{
  @Input() rowInfo:any;
  @Input() gridTheme: string = 'ag-theme-quartz';
  @Input() isDarkMode: boolean = false;
  isCollapsed = true;
  isCollapsedPayment = true;
  //private gridApi!: GridApi;

  themeClass = `${this.gridTheme}${this.isDarkMode ? '-dark' : ''}`;
  constructor(private cdr: ChangeDetectorRef) {}
  params: any;
  clientStatus: any;
   detailGridOptionsDue = {
    columnDefs: [
      { headerName: 'Initiated Date', field: 'initiatedDate' },
      { headerName: 'Amount', field: 'dueAmount' },
      { headerName: 'Total Due', field: 'totalDue' }
    ]
  };
  
  
  detailGridOptionsFollowUp = {
    columnDefs: [
      { headerName: 'Followed By', field: 'followedBy' },
      { headerName: 'Followed Person', field: 'followedPerson' },
      { headerName: 'Followed Date', field: 'followedDate' },
      { headerName: 'Collect Date', field: 'collectDate' },
      { headerName: 'Comment', field: 'comment' }
    ]
  };

   detailGridOptionsCompleted = {
    columnDefs: [
      { headerName: 'Collect By', field: 'collectedBy' },
      { headerName: 'Collected From', field: 'collectedFrom' },
      { headerName: 'Collected On', field: 'collectedOn' }
    ]
  };
  defaultColDef: ColDef = {
    resizable: false,
  };
  autoSizeStrategy: SizeColumnsToFitGridStrategy = {
    type: 'fitGridWidth',
  };
  rowHeight = 40;
  paginationPageSizeSelector = [1, 5, 10, 20];
  pagination = true;
  paginationPageSize = 1;
  ngOnChanges(changes: SimpleChanges): void {
    if(this.rowInfo){
      console.log(this.rowInfo,'rowData');
      this.clientStatus= this.rowInfo.status;
     // const selection = this.steps[this.clientStatus] == 'Due' ? 'due' : this.steps[this.clientStatus] == 'Completed'? 'completed':'followUp' ;
      this.updateDetailGrid(this.clientStatus);
      //console.log
    }
  }
  // agInit(params: any): void {
  //  // console.log()
  //   this.clientStatus =params.value;
  //   this.params = params;
  //   this.gridApi = params.api;
  // }

  refresh(params: any): boolean {
    this.params = params;
    return true;
  }

  onStatusClick(index: any) {
   // console.log(status,this.params);
    if(this.isStepEnabled(index)){
      const selection = this.steps[index] == 'Due' ? 'due' : this.steps[index] == 'Completed'? 'completed':'followUp' ;
      this.updateDetailGrid(selection);
    }
    }
   

  rowData:any[]=[];
  steps = ['Due', 'Follow Up', 'Completed'];
  currentStepIndex = 0;
  clickedStepIndex: number | null = null; // Track the clicked step index

  ngOnInit() {
    this.setCurrentStepIndex();
  }

  setCurrentStepIndex() {
    // Set the current step index based on clientStatus
    console.log(this.clientStatus)
    switch (this.clientStatus) {
      case 'due':
        this.currentStepIndex = 0;
        break;
      case 'followUp':
        this.currentStepIndex = 1;
        break;
      case 'completed':
        this.currentStepIndex = 2;
        break;
      default:
        this.currentStepIndex = 0;
    }
  }

  isStepEnabled(index: number): boolean {
    // Enable steps up to and including the current step index
    return index <= this.currentStepIndex;
  }

  checkClicked(index:number){
    if(this.isStepEnabled(index)){
    return index == this.clickedStepIndex;
  }else return false;
  }

  goToStep(index: number) {
    // Set clicked step index without changing the actual status
   
    if (this.isStepEnabled(index)) {
      this.clickedStepIndex = index;
    }
    //console.log(index,this.clickedStepIndex);
  }

  getStepClass(index: number): string {
    // Return class based on current status and clicked step
    if (index === this.clickedStepIndex) {
      return 'clicked';
    } else if (index === this.currentStepIndex) {
      return 'active';
    } else if (!this.isStepEnabled(index)) {
      return 'disabled';
    }
    return '';
  }
  columnDefs:ColDef[]=[];
  updateDetailGrid(status:string) {
    // Handle status update and dynamically update the child grid
   // const status = this.params.value;
   console.log(status)
    let updatedDetailGridOptions;
    this.rowData=[];
    this.columnDefs=[];
    // Dynamically set the detailGridOptions based on the status
    if (status === 'completed') {
     // updatedDetailGridOptions = this.params.context.componentParent.detailGridOptionsCompleted;
    
     this.columnDefs=[...this.detailGridOptionsCompleted.columnDefs];
     this.rowData=[...this.rowInfo.detailInfo['completed']];
     console.log(this.columnDefs,this.rowData)
    } else if (status === 'followUp') {
     // updatedDetailGridOptions = this.params.context.componentParent.detailGridOptionsFollowUp;
    
     this.columnDefs=[...this.detailGridOptionsFollowUp.columnDefs];
     this.rowData=[...this.rowInfo.detailInfo['followUp']];
    } else if (status === 'due') {
     // updatedDetailGridOptions = this.params.context.componentParent.detailGridOptionsDue;
    
     this.columnDefs=[...this.detailGridOptionsDue.columnDefs];
     this.rowData=[...this.rowInfo.detailInfo['due']];
    }

    // Update the detailCellRendererParams dynamically
    // this.params.api.getDetailCellRendererParams = {
    //   ...this.params.api.getDetailCellRendererParams,
    //   detailGridOptions: updatedDetailGridOptions,
    //   getDetailRowData: (params:any) => {
    //     // Pass the details to the detail row based on the status
    //      console.log(params);
    //     params.successCallback(params.data.detailInfo[status == 'Due' ? 'due' : status == 'Follow Up'? 'followUp' : 'completed']);
    //   }
    // };
    // console.log(this.params.api.getDetailCellRendererParams)

    // // Refresh the detail grid with the updated options
    // this.params.api.refreshCells();
  }
  gridApi:any;
  //currentExpanded='';
  toggleSection(section: string) {
    const node = this.params.node;

    // Check if the clicked section is the same as the current expanded section
    console.log(this.params.context.componentParent.currentExpanded,section,'test')
    if (this.params.context.componentParent.currentExpanded == section) {console.log(this.params.context.componentParent.currentExpanded,section,'test4')
      // If the clicked section is already expanded, collapse it
      node.setExpanded(false);
      this.params.context.componentParent.currentExpanded = ''; // Reset the expanded section
    } else {
      // Collapse all other expanded sections
      this.gridApi.forEachNode((otherNode: any) => {
        if (otherNode !== node && otherNode.expanded) {
          otherNode.setExpanded(false); // Collapse all other sections
        }
      });
      console.log(this.params.context.componentParent.currentExpanded,section,'test2')
      // Expand the clicked section and update currentExpanded
      this.params.context.componentParent.currentExpanded = section;
      console.log(this.params.context.componentParent.currentExpanded,section,'test3')
      node.setExpanded(true);
      // Set the current expanded section
    }
    this.cdr.detectChanges();
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }


  togglePayment(){
    this.isCollapsed =true;
    return this.isCollapsedPayment = !this.isCollapsedPayment;
  }

  toggleFollowUp(){
    this.isCollapsedPayment =true;
    return this.isCollapsed = !this.isCollapsed;
  }
}
