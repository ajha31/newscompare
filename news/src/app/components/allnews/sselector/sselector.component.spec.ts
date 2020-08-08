import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SselectorComponent } from './sselector.component';

describe('SselectorComponent', () => {
  let component: SselectorComponent;
  let fixture: ComponentFixture<SselectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SselectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SselectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
