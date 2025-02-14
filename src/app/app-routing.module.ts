import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagenotfoundComponent } from '../app/pagenotfound/pagenotfound.component'
import { ClientDetailsComponent } from './pages/client-details/client-details.component';
import { ClientProfileComponent } from './pages/client-profile/client-profile.component';

const routes: Routes = [
  { path: 'client-profile', component: ClientProfileComponent },
   { path: 'client', component: ClientDetailsComponent },
  { path: '', redirectTo: '/client', pathMatch: 'full' },
  { path: '**', pathMatch: 'full', component: PagenotfoundComponent }, 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
