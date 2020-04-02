import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FutureContentComponent } from './future-content.component';

describe('FutureContentComponent', () => {
  let component: FutureContentComponent;
  let fixture: ComponentFixture<FutureContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FutureContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FutureContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
