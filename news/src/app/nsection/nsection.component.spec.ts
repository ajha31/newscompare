import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NsectionComponent } from './nsection.component';

describe('NsectionComponent', () => {
  let component: NsectionComponent;
  let fixture: ComponentFixture<NsectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NsectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NsectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
