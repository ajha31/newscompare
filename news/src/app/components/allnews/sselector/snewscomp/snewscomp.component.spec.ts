import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnewscompComponent } from './snewscomp.component';

describe('SnewscompComponent', () => {
  let component: SnewscompComponent;
  let fixture: ComponentFixture<SnewscompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnewscompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnewscompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
