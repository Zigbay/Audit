import { Component, OnInit } from '@angular/core';
import { ClientProfileService } from './client-profile.service';

@Component({
  selector: 'app-client-profile',
  standalone: true,
  imports: [],
  templateUrl: './client-profile.component.html',
  styleUrl: './client-profile.component.scss'
})
export class ClientProfileComponent implements OnInit{

  constructor(private clientProfileService:ClientProfileService){
    
  }
  ngOnInit(): void {
   this.clientProfileService.getCientProfileDetails().subscribe({
    next: (value) => console.log('Received:', value),  // Success case
    error: (err) => console.error('Error:', err),     // Error case
    complete: () => console.log('Completed')  
          });      // When observable completes)
   
  }


}
