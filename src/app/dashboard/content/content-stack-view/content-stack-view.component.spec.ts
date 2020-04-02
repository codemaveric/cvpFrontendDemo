import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentStackViewComponent } from './content-stack-view.component';

describe('ContentStackViewComponent', () => {
  let component: ContentStackViewComponent;
  let fixture: ComponentFixture<ContentStackViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentStackViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentStackViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
