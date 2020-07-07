import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NselectorComponent } from './nselector.component';

describe('NselectorComponent', () => {
  let component: NselectorComponent;
  let fixture: ComponentFixture<NselectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NselectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NselectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
