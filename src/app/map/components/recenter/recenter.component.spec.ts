import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecenterComponent } from './recenter.component';

describe('RecenterComponent', () => {
  let component: RecenterComponent;
  let fixture: ComponentFixture<RecenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecenterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
