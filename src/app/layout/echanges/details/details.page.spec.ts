import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsPage } from './details.page';

describe('EchangeDetailsPage', () => {
  let component: EchangeDetailsPage;
  let fixture: ComponentFixture<EchangeDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EchangeDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
