import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, ViewEncapsulation } from '@angular/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import type {
  ColDef,
  GetDetailRowDataParams,
  GridApi,
  GridReadyEvent,
  SizeColumnsToFitGridStrategy,
  ValueFormatterFunc,
  ValueFormatterParams,
  ValueGetterParams,
} from '@ag-grid-community/core';
import { ModuleRegistry } from '@ag-grid-community/core';
import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-quartz.css';
import { ExcelExportModule } from '@ag-grid-enterprise/excel-export';
import { MasterDetailModule } from '@ag-grid-enterprise/master-detail';
import { MultiFilterModule } from '@ag-grid-enterprise/multi-filter';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import { AgGridModule } from 'ag-grid-angular';
import { getData } from './data';
import { AgGridAngular } from '@ag-grid-community/angular';
import { FormsModule } from '@angular/forms';
import { StatusComponentRenderer } from './cell-render/status-component-renderer.component';

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  ExcelExportModule,
  SetFilterModule,
  MultiFilterModule,
  MasterDetailModule,

]);


const statuses = {
  all: 'All',
  due: 'Due',
  followUp: 'Follow up',
  collection: 'Collection',
  completed: 'Completed'
};

const detailGridOptionsDue = {
  columnDefs: [
    { headerName: 'Initiated Date', field: 'initiatedDate' },
    { headerName: 'Amount', field: 'dueAmount' },
    { headerName: 'Total Due', field: 'totalDue' }
  ]
};

const detailGridOptionsFollowUp = {
  columnDefs: [
    { headerName: 'Followed By', field: 'followedBy' },
    { headerName: 'Followed Person', field: 'followedPerson' },
    { headerName: 'Followed Date', field: 'followedDate' },
    { headerName: 'Collect Date', field: 'collectDate' },
    { headerName: 'Comment', field: 'comment' }
  ]
};

const detailGridOptionsCollection = {
  columnDefs: [
    { headerName: 'Followed By', field: 'followedBy' },
    { headerName: 'Followed Person', field: 'followedPerson' },
    { headerName: 'Collect Date', field: 'collectDate' },
    { headerName: 'Comment', field: 'comment' }
  ]
};

const detailGridOptionsCompleted = {
  columnDefs: [
    { headerName: 'Collect By', field: 'collectedBy' },
    { headerName: 'Collected From', field: 'collectedFrom' },
    { headerName: 'Collected On', field: 'collectedOn' }
  ]
};



const statusFormatter: ValueFormatterFunc = ({ value }) =>
  statuses[value as keyof typeof statuses] ?? '';
@Component({
  selector: 'app-client-details',
  standalone: true,
  providers:[],
  imports: [ AgGridAngular,
    FormsModule,
    StatusComponentRenderer
    ],
  templateUrl: './client-details.component.html',
  styleUrl: './client-details.component.scss',
  encapsulation: ViewEncapsulation.None,
})



export class ClientDetailsComponent {
  @Input() gridTheme: string = 'ag-theme-quartz';
  @Input() isDarkMode: boolean = false;

  private gridApi!: GridApi;

  themeClass = `${this.gridTheme}${this.isDarkMode ? '-dark' : ''}`;

  rowData = getData();
  columnDefs = [
    // {
    //   field: 'client_id',
    //   headerName: 'UID',
    //  // cellRenderer: 'agGroupCellRenderer',
    //   headerClass: 'header-product',
    //   // minWidth: 300,
    // },
    {
      field: 'client_name',
      headerName: 'Client',
      filter: true,
      headerClass: 'header-status',
    },

    // {
    //   field: 'contact_name',
    //   headerName: 'Contact',
    //   //filter: true,
    //   headerClass: 'header-status',
    // },
    // {
    //   field: 'email',
    //   headerName: 'Email',
    //  // filter: true,
    //   headerClass: 'header-status',
    // },
    // {
    //   field: 'phone',
    //   headerName: 'Phone',
    //   //filter: true,
    //   headerClass: 'header-status',
    // },
    {
      field: 'address',
      headerName: 'Address',
//       filter: true,
      headerClass: 'header-status',
    },
    // {
    //   field: 'payment_due_date',
    //   headerName: 'Payment due date',
    //  // filter: true,
    //   headerClass: 'header-status',
    // },
    {
      field: 'status',
      headerName: 'Status',
      // valueFormatter: statusFormatter,
      // cellRenderer: StatusCellRenderer,
//        filter: true,
      // filterParams: {
      //   valueFormatter: statusFormatter,
      // },
    // field: 'status',
      // cellRenderer: 'agGroupCellRenderer',  // Use group cell renderer
      // cellRendererParams: {
      //   suppressCount: true,
      //   innerRenderer: (params:any) => {
      //     console.log(params);
      //     return params.value;},
      //  }
      cellRenderer:StatusComponentRenderer
    }

  ];

  gridContext = {
    componentParent: this
  };

  defaultColDef: ColDef = {
    resizable: false,
  };
  autoSizeStrategy: SizeColumnsToFitGridStrategy = {
    type: 'fitGridWidth',
  };
  detailCellRendererParams = {
    detailGridOptions: {
      columnDefs: [{ field: 'info', headerName: 'Details' }],
      defaultColDef: { flex: 1 },
      headerHeight: 38,
    },
    getDetailRowData: (params:any) => {
      // Pass the details to the detail row based on the status
      params.successCallback(params.data.detailInfo);
    }
  };
  updateDetailGridOptions(status: string) {
    console.log(status);
    if (status === 'completed') {
      this.detailCellRendererParams = {
        ...this.detailCellRendererParams,
        detailGridOptions: this.detailGridOptionsCompleted,
        getDetailRowData: (params) => {
          // Here you can customize how the details are fetched based on the status
          console.log('completed',params);
          params.successCallback(params.data.detailInfo['completed']);
        }
      };
    } else if(status === 'due'){
      this.detailCellRendererParams = {
        ...this.detailCellRendererParams,
        detailGridOptions: this.detailGridOptionsDue,
        getDetailRowData: (params) => {
          console.log('due',params);
          params.successCallback(params.data.detailInfo['due']);
        }
      };
    } else if(status === 'collection'){
           this.detailCellRendererParams = {
             ...this.detailCellRendererParams,
             detailGridOptions: this.detailGridOptionsCollection,
             getDetailRowData: (params) => {
               console.log('collection',params);
               params.successCallback(params.data.detailInfo['collection']);
             }
           };
         }
  else{
      this.detailCellRendererParams = {
        ...this.detailCellRendererParams,
        detailGridOptions: this.detailGridOptionsFollowUp,
        getDetailRowData: (params) => {
          console.log('followUp',params);
          params.successCallback(params.data.detailInfo['followUp']);
        }
      };
    }
  }

  rowHeight = 80;
  paginationPageSizeSelector = [5, 10, 20];
  pagination = true;
  paginationPageSize = 10;
  masterDetail = true;
  detailRowAutoHeight = true;

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  statusEntries = Object.entries(statuses);
  activeTab = 'all';
  quickFilterText = '';
  currentExpanded='';
  handleTabClick(status: string) {
    console.log(status);
    this.gridApi.setColumnFilterModel(
      'status',
      status === 'all' ? null : { values: [status] },
    );
    this.gridApi.onFilterChanged();
    this.activeTab = status;
  }

   detailGridOptionsDue = {
    columnDefs: [
      { headerName: 'Initiated Date', field: 'initiatedDate' },
      { headerName: 'Amount', field: 'dueAmount' },
      { headerName: 'Total Due', field: 'totalDue' }
    ],
    defaultColDef: { flex: 1 },
      headerHeight: 38,
    getDetailRowData: (params:any) => {
      params.successCallback(params.data.detailInfo['due']);
    }
  };

   detailGridOptionsFollowUp = {
    columnDefs: [
      { headerName: 'Followed By', field: 'followedBy' },
      { headerName: 'Followed Person', field: 'followedPerson' },
      { headerName: 'Followed Date', field: 'followedDate' },
      { headerName: 'Collect Date', field: 'collectDate' },
      { headerName: 'Comment', field: 'comment' }
    ],
    defaultColDef: { flex: 1 },
      headerHeight: 38,
    getDetailRowData: (params:any) => {
      params.successCallback(params.data.detailInfo['followUp']);
    }
  };

   detailGridOptionsCollection = {
    columnDefs: [
      { headerName: 'Followed By', field: 'followedBy' },
      { headerName: 'Followed Person', field: 'followedPerson' },
      { headerName: 'Collect Date', field: 'collectDate' },
      { headerName: 'Comment', field: 'comment' }
    ],
    defaultColDef: { flex: 1 },
      headerHeight: 38,
    getDetailRowData: (params:any) => {
      params.successCallback(params.data.detailInfo['collection']);
    }
  };

   detailGridOptionsCompleted = {
    columnDefs: [
      { headerName: 'Collect By', field: 'collectedBy' },
      { headerName: 'Collected From', field: 'collectedFrom' },
      { headerName: 'Collected On', field: 'collectedOn' }
    ],
    defaultColDef: { flex: 1 },
      headerHeight: 38,
    getDetailRowData: (params:any) => {
      params.successCallback(params.data.detailInfo['completed']);
    }
  };
}
