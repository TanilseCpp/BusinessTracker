import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersDetail } from './users-detail';

describe('UsersDetail', () => {
  let component: UsersDetail;
  let fixture: ComponentFixture<UsersDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
