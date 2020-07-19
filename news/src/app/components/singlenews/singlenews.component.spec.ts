import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglenewsComponent } from './singlenews.component';

describe('SinglenewsComponent', () => {
  let component: SinglenewsComponent;
  let fixture: ComponentFixture<SinglenewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinglenewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglenewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
