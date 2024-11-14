import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component'; 
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';



@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    PagenotfoundComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
   AppRoutingModule,
    CommonModule,
    AgGridModule
   // HighchartsChartModule,
    //FullCalendarModule,
    //CollapseModule.forRoot(),
    //ToastrModule.forRoot()
  ],
  schemas: [NO_ERRORS_SCHEMA] ,
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
     const baseHref = environment.APP_CONTEXT;
    // // Set base path dynamically
    // document.querySelector('base')?.setAttribute('href', baseHref);
  }

}
