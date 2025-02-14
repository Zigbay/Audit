import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRendererComponent } from './view-renderer.component';

describe('ViewRendererComponent', () => {
  let component: ViewRendererComponent;
  let fixture: ComponentFixture<ViewRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewRendererComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
