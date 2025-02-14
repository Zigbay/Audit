import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRendererComponent } from './delete-renderer.component';

describe('DeleteRendererComponent', () => {
  let component: DeleteRendererComponent;
  let fixture: ComponentFixture<DeleteRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteRendererComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
