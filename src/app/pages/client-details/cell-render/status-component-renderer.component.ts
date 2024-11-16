import { ChangeDetectorRef, Component } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { ICellRendererParams } from '@ag-grid-community/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'status-cell-renderer',
  standalone: true,
  imports:[CommonModule],
  template: `
    <div class="stepper">
  <div
    *ngFor="let step of steps; let i = index"
    class="step"
    [ngClass]="{
      due: clientStatus === 'due' && i === currentStepIndex,
      'follow-up': clientStatus === 'followUp' && i === currentStepIndex,
      completed: clientStatus === 'completed' && i === currentStepIndex,
      clicked: checkClicked(i),
      disabled: !isStepEnabled(i)
    }"
    (click)="goToStep(i);onStatusClick(i);checkClicked(i)"
  >
    <span class="label">{{ step }}</span>
  </div>
</div>

  `,
  styles: [
    `.stepper {
  display: flex;
  align-items: center;
}

.step {
  display: flex;
  align-items: center;
  padding: 1px 2px;
  cursor: pointer;
  transition: background-color 0.3s, border-color 0.3s;
  border: 2px solid #ccc; /* Default border color for all steps */
  border-radius: 5px;
}

/* Colors based on status */
.step.due {
  background-color: #f44336; /* Red background for "Due" */
  color: white;
  border-color: #f44336;
}

.step.follow-up {
  background-color: #ff9800; /* Yellow background for "Follow Up" */
  color: black;
  border-color: #ff9800;
}

.step.collection {
  background-color: #03b6fc; /* Yellow background for "Collection" */
  color: black;
  border-color: #ff9800;
}

.step.completed {
  background-color: #4caf50; /* Green background for "Completed" */
  color: white;
  border-color: #4caf50;
}

/* User-selected (clicked) step color */
.step.clicked {
  background-color: #00bcd4; /* Cyan background for clicked step */
  color: white;
  border-color: #00bcd4;
}

/* Disabled steps */
.step.disabled {
  color: #aaa;
  cursor: not-allowed;
  background-color: #f0f0f0;
  border-color: #ccc;
}

.label {
  margin-left: 8px;
}

.arrow {
  width: 20px;
  height: 30px;
  background: linear-gradient(to right, transparent 50%, #ddd 50%);
  clip-path: polygon(0 0, 100% 50%, 0 100%);
  margin-left: -5px;
}

    `,
  ],
})
export class StatusComponentRenderer implements ICellRendererAngularComp {
  // public value: string = '';
  // public valueFormatted: string = '';

  // agInit(params: ICellRendererParams): void {
  //   this.value = params.value;
  //   this.valueFormatted = params.valueFormatted!;
  // }

  // refresh(params: ICellRendererParams): boolean {
  //   this.value = params.value;
  //   this.valueFormatted = params.valueFormatted!;
  //   return true;
  // }
  constructor(private cdr: ChangeDetectorRef) {}
  params: any;
  clientStatus: any;
  agInit(params: any): void {
   // console.log()
    this.clientStatus =params.value;
    this.params = params;
    this.gridApi = params.api;
  }

  refresh(params: any): boolean {
    this.params = params;
    return true;
  }

  onStatusClick(status: any) {
    console.log(status,this.params);
    const selection = this.steps[status] == 'Due' ? 'due' : this.steps[status] == 'Completed'? 'completed':this.steps[status] == 'Collection'? 'collection':'followUp' ;
    this.params.context.componentParent.updateDetailGridOptions(selection);
    console.log(selection);
    setTimeout(()=>{this.toggleSection(selection)},10);

   // this.params.node.setExpanded(!this.params.node.expanded); // Toggle row expansion
    console.log(this.params.node,this.params.node.expanded);
   // this.toggleSection(selection);
    // Optionally, send additional data about the clicked status to the main grid component
    console.log(`Status clicked: ${status} ${this.params.context.componentParent.currentExpanded}`);

    // Add further actions based on the clicked status
  }


  steps = ['Due', 'Follow Up', 'Collection', 'Completed'];
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
      case 'collection':
        this.currentStepIndex = 2;
        break;
      case 'completed':
        this.currentStepIndex = 3;
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
    return index == this.clickedStepIndex;
  }

  goToStep(index: number) {
    // Set clicked step index without changing the actual status

    if (this.isStepEnabled(index)) {
      this.clickedStepIndex = index;
    }
    console.log(index,this.clickedStepIndex);
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

  updateDetailGrid(status:string) {
    // Handle status update and dynamically update the child grid
   // const status = this.params.value;
    let updatedDetailGridOptions;

    // Dynamically set the detailGridOptions based on the status
    if (status === 'Completed') {
      updatedDetailGridOptions = this.params.context.componentParent.detailGridOptionsCompleted;
    } else if (status === 'Follow Up') {
      updatedDetailGridOptions = this.params.context.componentParent.detailGridOptionsFollowUp;
    } else if (status === 'Collection') {
      updatedDetailGridOptions = this.params.context.componentParent.detailGridOptionsCollection;
    } else if (status === 'Due') {
      updatedDetailGridOptions = this.params.context.componentParent.detailGridOptionsDue;
    }

    // Update the detailCellRendererParams dynamically
    this.params.api.getDetailCellRendererParams = {
      ...this.params.api.getDetailCellRendererParams,
      detailGridOptions: updatedDetailGridOptions,
      getDetailRowData: (params:any) => {
        // Pass the details to the detail row based on the status
         console.log(params);
        params.successCallback(params.data.detailInfo[status == 'Due' ? 'due' : status == 'Follow Up'? 'followUp':status == 'Collection'? 'collection' : 'completed']);
      }
    };
    console.log(this.params.api.getDetailCellRendererParams)

    // Refresh the detail grid with the updated options
    this.params.api.refreshCells();
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

}
