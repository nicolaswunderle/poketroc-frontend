import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EchangeCreerPage } from './echange-creer.page';

describe('EchangeCreerPage', () => {
  let component: EchangeCreerPage;
  let fixture: ComponentFixture<EchangeCreerPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EchangeCreerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
