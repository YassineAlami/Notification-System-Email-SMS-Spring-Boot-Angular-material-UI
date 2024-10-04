import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendDeliveryComponent } from './send-delivery.component';

describe('SendDeliveryComponent', () => {
  let component: SendDeliveryComponent;
  let fixture: ComponentFixture<SendDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SendDeliveryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SendDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
