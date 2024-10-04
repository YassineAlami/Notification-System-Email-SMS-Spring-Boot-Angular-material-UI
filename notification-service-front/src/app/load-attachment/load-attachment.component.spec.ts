import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadAttachmentComponent } from './load-attachment.component';

describe('LoadAttachmentComponent', () => {
  let component: LoadAttachmentComponent;
  let fixture: ComponentFixture<LoadAttachmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoadAttachmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoadAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
