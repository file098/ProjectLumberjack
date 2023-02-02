import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentSessionComponent } from './recent-session.component';

describe('RecentSessionComponent', () => {
  let component: RecentSessionComponent;
  let fixture: ComponentFixture<RecentSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentSessionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
